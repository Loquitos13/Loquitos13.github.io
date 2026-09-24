(function () {
  const STORAGE_KEY = "site.lang";
  const DEFAULT_LANG = "pt";
  const MESSAGES_KEY = "portfolio.messages";
  const CONTACT_EMAIL = "bdiogo511@gmail.com";

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
    const response = await fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        _subject: payload.subject || "Novo contacto do portfólio",
        message: payload.message,
        _template: "table"
      })
    });
    if (!response.ok) throw new Error("send-failed");
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
          status.textContent = lang === "pt"
            ? "Mensagem enviada. Vou responder para o email que indicou."
            : "Message sent. I will reply to the email you provided.";
        }
      } catch {
        const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(payload.subject || "Portfolio contact")}&body=${encodeURIComponent(payload.message + "\n\n" + payload.name + "\n" + payload.email)}`;
        window.location.href = mail;
        if (status) {
          status.className = "form-status is-ok";
          status.textContent = lang === "pt"
            ? "A mensagem ficou guardada. Se o email não abrir, escreva para bdiogo511@gmail.com."
            : "Your message was saved. If email did not open, write to bdiogo511@gmail.com.";
        }
      } finally {
        if (submit) submit.disabled = false;
      }
    });
  }

  window.PortfolioAdmin = {
    CONTACT_EMAIL,
    MESSAGES_KEY,
    PASSWORD_HASH: "1ec96fce671caef7601766c28d7967e8bbe70644acfbb5fc66beaa34df911e63",
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
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("downloadResumeBtn");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const template = document.querySelector("#cvPdfTemplate .cv-a4");
    if (!template || typeof html2pdf !== "function") return;
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    html2pdf().set({
      margin: 0,
      filename: "Diogo_Pinto_CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: [] }
    }).from(clone).toPdf().get("pdf").then((pdf) => {
      while (pdf.internal.getNumberOfPages() > 1) {
        pdf.deletePage(pdf.internal.getNumberOfPages());
      }
    }).save();
  });
});
