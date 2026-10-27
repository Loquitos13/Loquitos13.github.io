// Cloudflare Worker for diogopintoit.pt.
// Static files are served from the assets binding; only /api/contact runs code.
// The contact endpoint emails Diogo first and, only if that email was accepted,
// sends the visitor a confirmation that their message was delivered.

const OWNER_EMAIL = "diogo@diogopintoit.pt";
const FROM = "Diogo Pinto <diogo@diogopintoit.pt>";
const SITE = "https://diogopintoit.pt";
const ALLOWED_ORIGINS = [SITE, "https://www.diogopintoit.pt"];
const RESEND_URL = "https://api.resend.com/emails";

const COPY = {
  pt: {
    subject: "Recebi a sua mensagem",
    hello: (name) => `Olá ${name},`,
    intro: "Obrigado pelo contacto. A sua mensagem chegou e vou responder para este email o mais depressa possível, normalmente com perguntas concretas e um próximo passo.",
    copy: "A sua mensagem",
    whatsapp: "Se for urgente, fale comigo no WhatsApp:",
    whatsappCta: "Abrir conversa",
    sign: "Diogo Pinto · Programador full stack",
    footer: "Recebeu este email porque enviou uma mensagem em diogopintoit.pt."
  },
  en: {
    subject: "I got your message",
    hello: (name) => `Hi ${name},`,
    intro: "Thank you for getting in touch. Your message arrived and I will reply to this email as soon as I can, usually with concrete questions and a next step.",
    copy: "Your message",
    whatsapp: "If it is urgent, message me on WhatsApp:",
    whatsappCta: "Open chat",
    sign: "Diogo Pinto · Full stack developer",
    footer: "You received this email because you sent a message on diogopintoit.pt."
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  }
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value, max) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);
}

async function handleContact(request, env) {
  if (request.method !== "POST") return json({ success: false, message: "method-not-allowed" }, 405);

  const origin = request.headers.get("Origin");
  const allowed = ALLOWED_ORIGINS.concat(env.EXTRA_ORIGIN ? [env.EXTRA_ORIGIN] : []);
  if (origin && !allowed.includes(origin)) return json({ success: false, message: "forbidden" }, 403);

  if (env.CONTACT_LIMITER) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const { success } = await env.CONTACT_LIMITER.limit({ key: ip });
    if (!success) return json({ success: false, message: "rate-limited" }, 429);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, message: "invalid-json" }, 400);
  }

  // Honeypot: bots fill every field. Pretend it worked and send nothing.
  if (clean(data._gotcha, 200)) return json({ success: true, confirmation: false });

  const lang = data.lang === "en" ? "en" : "pt";
  const name = clean(data.name, 100);
  const email = clean(data.email, 200);
  const subject = clean(data.subject, 120);
  const message = clean(data.message, 5000);

  if (!name || !message || !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/.test(email)) {
    return json({ success: false, message: "invalid-fields" }, 422);
  }
  if (!env.RESEND_API_KEY) return json({ success: false, message: "not-configured" }, 503);

  const owner = await sendEmail(env, withTemplate({
    from: FROM,
    to: [OWNER_EMAIL],
    reply_to: `${name.replace(/[<>"]/g, "")} <${email}>`,
    subject: `Novo contacto: ${subject || "Site"} · ${name}`,
    html: ownerHtml({ name, email, subject, message, lang }),
    text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject || "-"}\nIdioma: ${lang}\n\n${message}`
  }, env.TEMPLATE_OWNER, {
    NOME: asHtml(name),
    CLIENTE_EMAIL: asHtml(email),
    ASSUNTO: asHtml(subject || "-"),
    IDIOMA: lang.toUpperCase(),
    MENSAGEM: asHtml(message)
  }));
  if (!owner.ok) return json({ success: false, message: "delivery-failed" }, 502);

  const t = COPY[lang];
  const visitor = await sendEmail(env, withTemplate({
    from: FROM,
    to: [email],
    reply_to: OWNER_EMAIL,
    subject: t.subject,
    html: visitorHtml({ name, message, lang }),
    text: `${t.hello(name.split(/\s+/)[0])}\n\n${t.intro}\n\n${t.copy}:\n${message}\n\n${t.whatsapp} https://wa.me/351913417390\n\n${t.sign}\n${SITE}`
  }, lang === "en" ? env.TEMPLATE_CLIENT_EN : env.TEMPLATE_CLIENT_PT, {
    NOME: asHtml(name.split(/\s+/)[0]),
    MENSAGEM: asHtml(message)
  }));

  return json({ success: true, confirmation: visitor.ok });
}

// Resend inserts {{{VAR}}} values as-is, so anything typed by the visitor is escaped here first.
function asHtml(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

// Uses a published Resend template when its id/alias is configured, otherwise the built-in HTML.
function withTemplate(payload, templateId, variables) {
  if (!templateId) return payload;
  const { html, text, ...rest } = payload;
  return { ...rest, template: { id: templateId, variables }, fallback: payload };
}

async function sendEmail(env, request) {
  const { fallback, ...payload } = request;
  const result = await postToResend(env, payload);
  // A missing or unpublished template must not lose the message: retry with the built-in HTML.
  if (!result.ok && fallback) return postToResend(env, fallback);
  return result;
}

async function postToResend(env, payload) {
  try {
    const response = await fetch(env.RESEND_API_URL || RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const body = await response.json().catch(() => ({}));
    return { ok: response.ok && Boolean(body.id), body };
  } catch (error) {
    return { ok: false, body: { error: String(error) } };
  }
}

function ownerHtml({ name, email, subject, message, lang }) {
  const row = (label, value) =>
    `<tr><td style="padding:8px 12px;color:#5a5d66;font:13px/1.4 Arial,sans-serif;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#16181d;font:15px/1.5 Arial,sans-serif">${value}</td></tr>`;
  return `<!doctype html><html><body style="margin:0;background:#f4f4f1;padding:24px">
<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border-collapse:separate">
<tr><td style="padding:24px 24px 8px;font:600 20px/1.3 Arial,sans-serif;color:#16181d">Novo contacto pelo site</td></tr>
<tr><td style="padding:0 12px 12px"><table role="presentation" width="100%">
${row("Nome", escapeHtml(name))}
${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0b7a5c">${escapeHtml(email)}</a>`)}
${row("Assunto", escapeHtml(subject || "-"))}
${row("Idioma", lang.toUpperCase())}
${row("Mensagem", escapeHtml(message).replace(/\n/g, "<br>"))}
</table></td></tr>
<tr><td style="padding:0 24px 24px;font:13px/1.5 Arial,sans-serif;color:#5a5d66">Responda a este email para escrever diretamente a ${escapeHtml(name)}. O cliente recebe também uma confirmação automática de receção.</td></tr>
</table></body></html>`;
}

function visitorHtml({ name, message, lang }) {
  const t = COPY[lang];
  const first = escapeHtml(name.split(/\s+/)[0]);
  return `<!doctype html><html lang="${lang === "pt" ? "pt-PT" : "en"}"><body style="margin:0;background:#f4f4f1;padding:24px">
<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border-collapse:separate">
<tr><td style="background:#0b7a5c;padding:24px 28px"><img src="${SITE}/assets/brand/logo-email.png" width="176" height="45" alt="Diogo Pinto" style="display:block;border:0"></td></tr>
<tr><td style="padding:28px 28px 8px;font:600 22px/1.3 Arial,sans-serif;color:#16181d">${escapeHtml(t.hello(first))}</td></tr>
<tr><td style="padding:0 28px 20px;font:16px/1.6 Arial,sans-serif;color:#3a3d45">${escapeHtml(t.intro)}</td></tr>
<tr><td style="padding:0 28px 24px"><div style="background:#f4f4f1;border-radius:10px;padding:16px 18px;font:15px/1.6 Arial,sans-serif;color:#3a3d45">
<div style="font:12px/1.4 'Courier New',monospace;color:#085c45;margin-bottom:8px">${escapeHtml(t.copy)}</div>${escapeHtml(message).replace(/\n/g, "<br>")}</div></td></tr>
<tr><td style="padding:0 28px 28px;font:15px/1.6 Arial,sans-serif;color:#3a3d45">${escapeHtml(t.whatsapp)}<br>
<a href="https://wa.me/351913417390" style="display:inline-block;margin-top:10px;background:#0b7a5c;color:#ffffff;text-decoration:none;font:600 15px/1 Arial,sans-serif;padding:13px 20px;border-radius:8px">${escapeHtml(t.whatsappCta)}</a></td></tr>
<tr><td style="padding:20px 28px;border-top:1px solid #e2e2dd;font:14px/1.5 Arial,sans-serif;color:#16181d">${escapeHtml(t.sign)}<br><a href="${SITE}" style="color:#0b7a5c">diogopintoit.pt</a></td></tr>
</table>
<p style="max-width:600px;margin:12px auto 0;font:12px/1.5 Arial,sans-serif;color:#5a5d66;text-align:center">${escapeHtml(t.footer)}</p>
</body></html>`;
}
