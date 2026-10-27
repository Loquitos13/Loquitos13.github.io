(function () {
  const STORAGE_KEY = "site.lang";
  const DEFAULT_LANG = "pt";
  const MESSAGES_KEY = "portfolio.messages";
  const CONTACT_EMAIL = "diogo@diogopintoit.pt";
  // Public Web3Forms key: it can only deliver to the address it was created for.
  const WEB3FORMS_KEY = "e058b197-fcf7-45a3-bcf3-52a10d8f3cfc";

  function currentPathLang() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  }

  function storedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }

  function fileName() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function isAdminPage() {
    return /admin\.html$/i.test(window.location.pathname);
  }

  function navigateForLang(targetLang) {
    const isPtPage = currentPathLang() === "pt";
    const file = fileName();
    if (isAdminPage()) {
      document.documentElement.setAttribute("lang", targetLang === "pt" ? "pt-PT" : "en-US");
      syncLangControls(targetLang);
      window.dispatchEvent(new CustomEvent("site:lang", { detail: { lang: targetLang } }));
      return;
    }
    if (targetLang === "pt" && !isPtPage) {
      window.location.href = "pt/" + file;
      return;
    }
    if (targetLang === "en" && isPtPage) {
      window.location.href = "../" + file;
      return;
    }
    document.documentElement.setAttribute("lang", targetLang === "pt" ? "pt-PT" : "en-US");
    syncLangControls(targetLang);
  }

  function syncLangControls(lang) {
    document.querySelectorAll("#languageSwitcher").forEach((sel) => {
      if (sel instanceof HTMLSelectElement) sel.value = lang;
    });
    document.querySelectorAll("[data-lang-toggle] [data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  }

  function maybeRedirectToDefaultPt() {
    if (isAdminPage()) return false;
    if (currentPathLang() === "pt") return false;
    const saved = storedLang();
    if (saved === "en") return false;
    window.location.replace("pt/" + fileName());
    return true;
  }

  function bindLanguage() {
    document.querySelectorAll("#languageSwitcher").forEach((sel) => {
      if (!(sel instanceof HTMLSelectElement)) return;
      sel.addEventListener("change", (e) => {
        const value = e.target.value === "en" ? "en" : "pt";
        setStoredLang(value);
        navigateForLang(value);
      });
    });

    document.querySelectorAll("[data-lang-toggle]").forEach((group) => {
      group.addEventListener("click", (e) => {
        const target = e.target.closest("[data-lang]");
        if (!target) return;
        const lang = target.getAttribute("data-lang");
        if (lang !== "en" && lang !== "pt") return;
        setStoredLang(lang);
        navigateForLang(lang);
      });
    });
  }

  function bindNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".site-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function bindHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function readMessages() {
    try {
      return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function writeMessages(items) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(items));
  }

  function saveMessage(payload) {
    const items = readMessages();
    items.unshift({
      id: String(Date.now()),
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      createdAt: new Date().toISOString(),
      read: false
    });
    writeMessages(items);
  }

  async function sendContact(payload) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        from_name: "Portfólio diogopintoit.pt",
        subject: payload.subject ? `Novo contacto: ${payload.subject}` : "Novo contacto do portfólio",
        name: payload.name,
        email: payload.email,
        message: payload.message
      })
    });
    // Web3Forms reports the outcome in the body; only success=true means the email went out.
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) throw new Error(result.message || "send-failed");
  }

  function bindContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const status = document.getElementById("contactStatus");
    const submit = form.querySelector("[type='submit']");
    const lang = currentPathLang();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const honey = form.querySelector("[name='_gotcha']");
      if (honey && honey.value) return;

      const payload = {
        name: String(form.elements.namedItem("name")?.value || "").trim(),
        email: String(form.elements.namedItem("email")?.value || "").trim(),
        subject: String(form.elements.namedItem("subject")?.value || "").trim(),
        message: String(form.elements.namedItem("message")?.value || "").trim()
      };

      if (!payload.name || !payload.email || !payload.message) {
        if (status) {
          status.className = "form-status is-error";
          status.textContent = lang === "pt"
            ? "Preencha o nome, o email e a mensagem."
            : "Please fill in your name, email, and message.";
        }
        return;
      }

      if (submit) submit.disabled = true;
      if (status) {
        status.className = "form-status";
        status.textContent = lang === "pt" ? "A enviar..." : "Sending...";
      }

      saveMessage(payload);

      try {
        await sendContact(payload);
        form.reset();
        if (status) {
          status.className = "form-status is-ok";
          status.textContent = lang === "pt" ? "Mensagem enviada." : "Message sent.";
        }
        try {
          sessionStorage.setItem("contact.name", payload.name);
        } catch {}
        const page = lang === "pt" ? "obrigado.html" : "thanks.html";
        window.location.assign(`${page}?voltar=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      } catch {
        const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(payload.subject || "Portfolio contact")}&body=${encodeURIComponent(payload.message + "\n\n" + payload.name + "\n" + payload.email)}`;
        const wa = "https://wa.me/351913417390?text=" + encodeURIComponent(payload.message);
        if (status) {
          status.className = "form-status is-error";
          status.innerHTML = lang === "pt"
            ? `Não foi possível enviar a mensagem. Envie-a por <a href="${wa}" target="_blank" rel="noopener">WhatsApp</a> ou por <a href="${mail}">email</a>; o texto já vai preenchido.`
            : `Your message could not be sent. Send it on <a href="${wa}" target="_blank" rel="noopener">WhatsApp</a> or by <a href="${mail}">email</a>; the text is already filled in.`;
        }
      } finally {
        if (submit) submit.disabled = false;
      }
    });
  }

  window.PortfolioAdmin = {
    CONTACT_EMAIL,
    MESSAGES_KEY,
    PASSWORD_HASH: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", // admin123
    readMessages,
    writeMessages
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (maybeRedirectToDefaultPt()) return;
    const lang = storedLang() || currentPathLang() || DEFAULT_LANG;
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-PT" : "en-US");
    syncLangControls(lang);
    bindLanguage();
    bindNav();
    bindHeaderScroll();
    bindContactForm();
    window.bindContactFormRetry = bindContactForm;
  });
})();

document.addEventListener("click", (e) => {
  const btn = e.target instanceof Element ? e.target.closest("#downloadResumeBtn") : null;
  if (!btn) return;

  e.preventDefault();
  const template = document.querySelector("#cvPdfTemplate .cv-a4");
    if (!template || typeof html2pdf !== "function") return;
    const clone = template.cloneNode(true);
    html2pdf().set({
      margin: 0,
      filename: "Diogo_Pinto_CV.pdf",
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: { scale: 3, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: [] }
    }).from(clone).toPdf().get("pdf").then((pdf) => {
      while (pdf.internal.getNumberOfPages() > 1) {
        pdf.deletePage(pdf.internal.getNumberOfPages());
      }
    }).save();
});
