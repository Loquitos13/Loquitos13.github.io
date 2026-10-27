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
    intro: "Obrigado pelo contacto. A sua mensagem chegou e vou responder a este email o mais rápido possível, normalmente com perguntas concretas e um próximo passo.",
    copy: "A sua mensagem",
    whatsapp: "Caso seja urgente, fale comigo no WhatsApp:",
    whatsappCta: "Abrir conversa",
    badge: "Mensagem recebida",
    next: "O que acontece a seguir",
    steps: [
      "Leio a sua mensagem com atenção.",
      "Respondo com perguntas concretas sobre o projeto.",
      "Marcamos uma videochamada curta para alinhar o próximo passo."
    ],
    sign: "Diogo Pinto · Programador full stack",
    tagline: "Websites, plataformas e software à medida.",
    footer: "Recebeu este email porque enviou uma mensagem em diogopintoit.pt."
  },
  en: {
    subject: "I got your message",
    hello: (name) => `Hi ${name},`,
    intro: "Thank you for getting in touch. Your message arrived and I will reply to this email as soon as I can, usually with concrete questions and a next step.",
    copy: "Your message",
    whatsapp: "If it is urgent, message me on WhatsApp:",
    whatsappCta: "Open chat",
    badge: "Message received",
    next: "What happens next",
    steps: [
      "I read your message carefully.",
      "I reply with concrete questions about the project.",
      "We book a short video call to agree on the next step."
    ],
    sign: "Diogo Pinto · Full stack developer",
    tagline: "Websites, platforms and custom software.",
    footer: "You received this email because you sent a message on diogopintoit.pt."
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env);
    if (url.pathname === "/api/feedback") return handleFeedback(request, env, ctx);
    if (url.pathname === "/api/feedback/admin") return handleFeedbackAdmin(request, env);
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

// Shared guard for public form posts: same-site origin, per-IP rate limit, JSON body.
// Returns { data } or { response } with the error to send back.
async function readFormPost(request, env, scope) {
  const origin = request.headers.get("Origin");
  const allowed = ALLOWED_ORIGINS.concat(env.EXTRA_ORIGIN ? [env.EXTRA_ORIGIN] : []);
  if (origin && !allowed.includes(origin)) return { response: json({ success: false, message: "forbidden" }, 403) };

  if (env.CONTACT_LIMITER) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const { success } = await env.CONTACT_LIMITER.limit({ key: `${scope}:${ip}` });
    if (!success) return { response: json({ success: false, message: "rate-limited" }, 429) };
  }

  try {
    return { data: await request.json() };
  } catch {
    return { response: json({ success: false, message: "invalid-json" }, 400) };
  }
}

async function handleContact(request, env) {
  if (request.method !== "POST") return json({ success: false, message: "method-not-allowed" }, 405);

  const { data, response } = await readFormPost(request, env, "contact");
  if (response) return response;

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

// ---------- Client feedback ----------
// All testimonials live in one KV document. Volume is tiny (a handful a month), so a single
// read-modify-write keeps listing and moderation simple. New entries start as "pending" and
// only "approved" ones are ever returned publicly.

const FEEDBACK_KEY = "feedback:v1";
const FEEDBACK_STATUSES = ["pending", "approved", "hidden"];

async function loadFeedback(env) {
  return (await env.FEEDBACK.get(FEEDBACK_KEY, "json")) || [];
}

function publicFeedback(item) {
  const { id, name, role, company, rating, text, lang, createdAt } = item;
  return { id, name, role, company, rating, text, lang, date: createdAt.slice(0, 10) };
}

async function handleFeedback(request, env, ctx) {
  if (!env.FEEDBACK) return json({ success: false, message: "not-configured" }, 503);

  if (request.method === "GET") {
    const items = (await loadFeedback(env)).filter((item) => item.status === "approved");
    return new Response(JSON.stringify({ success: true, items: items.map(publicFeedback) }), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300" }
    });
  }
  if (request.method !== "POST") return json({ success: false, message: "method-not-allowed" }, 405);

  const { data, response } = await readFormPost(request, env, "feedback");
  if (response) return response;
  if (clean(data._gotcha, 200)) return json({ success: true });

  const rating = Number(data.rating);
  const item = {
    id: crypto.randomUUID(),
    name: clean(data.name, 80),
    role: clean(data.role, 80),
    company: clean(data.company, 80),
    email: clean(data.email, 200),
    rating,
    text: clean(data.text, 1200),
    lang: data.lang === "en" ? "en" : "pt",
    consent: data.consent === true,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  if (!item.name || item.text.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5 || !item.consent
    || (item.email && !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/.test(item.email))) {
    return json({ success: false, message: "invalid-fields" }, 422);
  }

  const items = await loadFeedback(env);
  items.unshift(item);
  await env.FEEDBACK.put(FEEDBACK_KEY, JSON.stringify(items));

  if (env.RESEND_API_KEY) ctx.waitUntil(postToResend(env, {
    from: FROM,
    to: [OWNER_EMAIL],
    ...(item.email ? { reply_to: item.email } : {}),
    subject: `Novo feedback (${"★".repeat(rating)}) · ${item.name}`,
    html: feedbackOwnerHtml(item),
    text: `${item.name}${item.company ? ` · ${item.company}` : ""}\n${"★".repeat(rating)}\n\n${item.text}\n\nAprovar: ${SITE}/feedback-admin.html`
  }));

  return json({ success: true });
}

async function handleFeedbackAdmin(request, env) {
  if (!env.FEEDBACK || !env.ADMIN_TOKEN) return json({ success: false, message: "not-configured" }, 503);
  if (!(await sameSecret(request.headers.get("Authorization") || "", `Bearer ${env.ADMIN_TOKEN}`))) {
    return json({ success: false, message: "unauthorized" }, 401);
  }

  const items = await loadFeedback(env);
  if (request.method === "GET") return json({ success: true, items });
  if (request.method !== "POST") return json({ success: false, message: "method-not-allowed" }, 405);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, message: "invalid-json" }, 400);
  }
  const index = items.findIndex((item) => item.id === data.id);
  if (index < 0) return json({ success: false, message: "not-found" }, 404);

  if (data.action === "delete") items.splice(index, 1);
  else if (FEEDBACK_STATUSES.includes(data.status)) items[index].status = data.status;
  else return json({ success: false, message: "invalid-fields" }, 422);

  await env.FEEDBACK.put(FEEDBACK_KEY, JSON.stringify(items));
  return json({ success: true, items });
}

// Compares digests so the time taken does not reveal how much of the token matched.
async function sameSecret(a, b) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([a, b].map((s) => crypto.subtle.digest("SHA-256", enc.encode(s))));
  return crypto.subtle.timingSafeEqual(x, y);
}

function feedbackOwnerHtml(item) {
  return `<!doctype html><html><body bgcolor="#f4f4f1" style="margin:0;background-color:#f4f4f1;padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px">
<tr><td style="padding:24px 24px 4px;font:600 20px/1.3 Arial,sans-serif;color:#16181d">Novo feedback de cliente</td></tr>
<tr><td style="padding:0 24px 12px;font:20px/1.2 Arial,sans-serif;color:#0b7a5c">${"★".repeat(item.rating)}<span style="color:#d6d6d0">${"★".repeat(5 - item.rating)}</span></td></tr>
<tr><td style="padding:0 24px 16px;font:15px/1.6 Arial,sans-serif;color:#3a3d45">${asHtml(item.text)}</td></tr>
<tr><td style="padding:0 24px 20px;font:14px/1.5 Arial,sans-serif;color:#16181d"><strong>${escapeHtml(item.name)}</strong>${[item.role, item.company].filter(Boolean).map((v) => ` · ${escapeHtml(v)}`).join("")}${item.email ? `<br><a href="mailto:${escapeHtml(item.email)}" style="color:#0b7a5c">${escapeHtml(item.email)}</a>` : ""}</td></tr>
<tr><td style="padding:0 24px 24px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#0b7a5c" style="background-color:#0b7a5c;border-radius:8px"><a href="${SITE}/feedback-admin.html" style="display:inline-block;padding:12px 18px;font:600 15px/1 Arial,sans-serif;color:#ffffff;text-decoration:none">Rever e aprovar</a></td></tr></table></td></tr>
</table></body></html>`;
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

const SOCIAL = [
  ["whatsapp", "WhatsApp", "https://wa.me/351913417390"],
  ["mail", "Email", `mailto:${OWNER_EMAIL}`],
  ["linkedin", "LinkedIn", "https://www.linkedin.com/in/diogo-bpinto"],
  ["github", "GitHub", "https://github.com/Loquitos13"],
  ["instagram", "Instagram", "https://www.instagram.com/dlocos13/"]
];

// Signature block: contacts, social icons and the dp watermark bleeding off the bottom-right corner.
// The watermark is a PNG with its 65% opacity baked in, because email clients ignore CSS opacity.
function footerHtml(t) {
  const icons = SOCIAL.map(([icon, label, href]) =>
    `<td style="padding:0 8px 0 0"><a href="${href}" style="text-decoration:none"><img src="${SITE}/assets/brand/email-${icon}.png" width="36" height="36" alt="${label}" style="display:block;border:0"></a></td>`
  ).join("");
  const line = (label, value, href) =>
    `<tr><td style="padding:3px 14px 3px 0;font:12px/1.5 'Courier New',monospace;color:#5a5d66;white-space:nowrap">${label}</td><td style="padding:3px 0;font:14px/1.5 Arial,sans-serif"><a href="${href}" style="color:#0b7a5c;text-decoration:none">${value}</a></td></tr>`;
  return `<tr><td class="dp-foot" bgcolor="#ffffff" background="${SITE}/assets/brand/email-watermark.png" style="padding:26px 28px 30px;border-top:1px solid #e2e2dd;background-color:#ffffff;background-image:url('${SITE}/assets/brand/email-watermark.png');background-position:right bottom;background-repeat:no-repeat">
<div style="font:600 16px/1.4 Arial,sans-serif;color:#16181d">${escapeHtml(t.sign)}</div>
<div style="font:14px/1.5 Arial,sans-serif;color:#5a5d66;margin:2px 0 16px">${escapeHtml(t.tagline)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:18px">
${line("Email", OWNER_EMAIL, `mailto:${OWNER_EMAIL}`)}
${line("WhatsApp", "+351 913 417 390", "https://wa.me/351913417390")}
${line("Site", "diogopintoit.pt", SITE)}
</table>
<table role="presentation" cellpadding="0" cellspacing="0"><tr>${icons}</tr></table>
</td></tr>`;
}

function visitorHtml({ name, message, lang }) {
  const t = COPY[lang];
  const first = escapeHtml(name.split(/\s+/)[0]);
  const steps = t.steps.map((step, i) =>
    `<tr><td width="34" valign="top" style="padding:0 0 10px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="24" height="24" bgcolor="#0b7a5c" align="center" style="background-color:#0b7a5c;border-radius:12px;font:600 12px/24px Arial,sans-serif;color:#ffffff">${i + 1}</td></tr></table></td><td style="padding:2px 0 10px;font:15px/1.5 Arial,sans-serif;color:#3a3d45">${escapeHtml(step)}</td></tr>`
  ).join("");
  return `<!doctype html><html lang="${lang === "pt" ? "pt-PT" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><style>@media (max-width:480px){.dp-badge{display:none!important}.dp-foot{background-size:150px auto!important}}</style><title>${escapeHtml(t.subject)}</title></head>
<body bgcolor="#f4f4f1" style="margin:0;background-color:#f4f4f1;padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;border-collapse:separate">
<tr><td bgcolor="#0b7a5c" style="background-color:#0b7a5c;padding:22px 28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td><img src="${SITE}/assets/brand/logo-email.png" width="176" height="45" alt="Diogo Pinto" style="display:block;border:0"></td>
<td class="dp-badge" align="right" style="font:12px/1.4 'Courier New',monospace;color:#d6efe6;white-space:nowrap">&#10003; ${escapeHtml(t.badge)}</td>
</tr></table></td></tr>
<tr><td style="padding:30px 28px 8px;font:600 24px/1.3 Arial,sans-serif;color:#16181d">${escapeHtml(t.hello(first))}</td></tr>
<tr><td style="padding:0 28px 22px;font:16px/1.6 Arial,sans-serif;color:#3a3d45">${escapeHtml(t.intro)}</td></tr>
<tr><td style="padding:0 28px 26px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="#f4f4f1" style="background-color:#f4f4f1;border-left:3px solid #0b7a5c;border-radius:0 10px 10px 0;padding:16px 18px;font:15px/1.6 Arial,sans-serif;color:#3a3d45">
<div style="font:12px/1.4 'Courier New',monospace;color:#085c45;margin-bottom:8px">${escapeHtml(t.copy)}</div>${escapeHtml(message).replace(/\n/g, "<br>")}</td></tr></table></td></tr>
<tr><td style="padding:0 28px 8px;font:12px/1.4 'Courier New',monospace;color:#085c45;text-transform:uppercase;letter-spacing:.06em">${escapeHtml(t.next)}</td></tr>
<tr><td style="padding:4px 28px 16px"><table role="presentation" cellpadding="0" cellspacing="0">${steps}</table></td></tr>
<tr><td style="padding:0 28px 30px;font:15px/1.6 Arial,sans-serif;color:#3a3d45">${escapeHtml(t.whatsapp)}
<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:12px"><tr><td bgcolor="#0b7a5c" style="background-color:#0b7a5c;border-radius:8px"><a href="https://wa.me/351913417390" style="display:inline-block;padding:13px 20px;font:600 15px/1 Arial,sans-serif;color:#ffffff;text-decoration:none">${escapeHtml(t.whatsappCta)} &rarr;</a></td></tr></table></td></tr>
${footerHtml(t)}
</table>
<p style="max-width:600px;margin:14px auto 0;font:12px/1.5 Arial,sans-serif;color:#5a5d66;text-align:center">${escapeHtml(t.footer)}</p>
</body></html>`;
}
