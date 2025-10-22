// Lightweight i18n + toggle (EN default, supports PT). Works across all pages.
// Usage:
// - Add data-en and data-pt attributes to elements. The element text will switch on language change.
// - If the value contains HTML or you want innerHTML, add data-i18n-type="html".
// - Optionally, supply data-i18n-key and extend the dictionary below if you prefer keyed strings.

(function () {
  const STORAGE_KEY = "site.lang";
  const DEFAULT_LANG = "en"; // per user's preference
  const REDIRECT_MODE = true; // Use separate pages per language

  const dict = { en: {}, pt: {} };

  function isHTMLString(str) {
    return typeof str === "string" && /<\w|&[a-zA-Z#0-9]+;/.test(str);
  }

  function applyToElement(el, value) {
    const asHTML = el.getAttribute("data-i18n-type") === "html" || isHTMLString(value);
    if (asHTML) el.innerHTML = value || ""; else el.textContent = value || "";
  }

  function translate(lang) {
    document.documentElement.setAttribute("lang", lang);

    // In redirect mode, we don't mutate page content; just sync UI controls
    if (REDIRECT_MODE) {
      document.querySelectorAll("#languageSwitcher").forEach((sel) => {
        if (sel instanceof HTMLSelectElement) sel.value = lang;
      });
      document.querySelectorAll('[data-lang-toggle] [data-lang]').forEach((btn) => {
        const active = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('btn-secondary', active);
        btn.classList.toggle('btn-outline-secondary', !active);
      });
      return;
    }

    // Fallback attribute-based translation (disabled when REDIRECT_MODE=true)
    const attrNodes = document.querySelectorAll("[data-en], [data-pt]");
    attrNodes.forEach((el) => {
      const value = el.dataset[lang];
      if (value != null) applyToElement(el, value);
    });
    const keyNodes = document.querySelectorAll("[data-i18n-key]");
    keyNodes.forEach((el) => {
      if (el.hasAttribute("data-en") || el.hasAttribute("data-pt")) return;
      const key = el.getAttribute("data-i18n-key");
      const value = dict[lang] && dict[lang][key];
      if (value != null) applyToElement(el, value);
    });
  }

  function setLang(lang) {
    const finalLang = (lang === "pt" ? "pt" : "en");
    try { localStorage.setItem(STORAGE_KEY, finalLang); } catch {}
    translate(finalLang);
  }

  function currentLang() {
    const path = window.location.pathname;
    const inPt = /\/(pt)\//.test(path);
    const pathLang = inPt ? "pt" : "en";
    try {
      return localStorage.getItem(STORAGE_KEY) || pathLang || DEFAULT_LANG;
    } catch {
      return pathLang || DEFAULT_LANG;
    }
  }

  function navigateForLangChange(targetLang) {
    const isPtPage = /\/(pt)\//.test(window.location.pathname);
    const file = (window.location.pathname.split('/').pop() || 'index.html');
    if (targetLang === 'pt' && !isPtPage) {
      window.location.href = `pt/${file}`;
    } else if (targetLang === 'en' && isPtPage) {
      window.location.href = `../${file}`;
    } else {
      // same context, no nav needed
      setLang(targetLang);
    }
  }

  function bindToggles() {
    document.querySelectorAll("#languageSwitcher").forEach((sel) => {
      if (!(sel instanceof HTMLSelectElement)) return;
      sel.addEventListener("change", (e) => {
        const value = e.target.value === "pt" ? "pt" : "en";
        try { localStorage.setItem(STORAGE_KEY, value); } catch {}
        if (REDIRECT_MODE) {
          navigateForLangChange(value);
        } else {
          setLang(value);
        }
      });
    });

    document.querySelectorAll('[data-lang-toggle]').forEach((group) => {
      group.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const lang = target.getAttribute('data-lang');
        if (lang !== 'en' && lang !== 'pt') return;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
        if (REDIRECT_MODE) navigateForLangChange(lang); else setLang(lang);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindToggles();
    setLang(currentLang());
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("downloadResumeBtn");
  if (!btn) return;

  btn.addEventListener("click", e => {
    e.preventDefault();

    const template = document.querySelector("#cvPdfTemplate .cv-a4");
    if (!template) return;

    const clone = template.cloneNode(true);

    // Inserir cards da experiência
    const expSource = document.getElementById("experienceSection");
    const pdfExp = clone.querySelector("#pdfExp");
    if (expSource && pdfExp) cloneCards(expSource, pdfExp);

    // Inserir cards da educação
    const eduSource = document.getElementById("educationSection");
    const pdfEdu = clone.querySelector("#pdfEdu");
    if (eduSource && pdfEdu) cloneCards(eduSource, pdfEdu);

    // Finalmente gerar o PDF
    html2pdf().set({
      margin: 0,
      filename: "Diogo_Pinto_CV.pdf",
      image: { type:"jpeg", quality:0.98 },
      html2canvas: { scale:2, useCORS:true },
      jsPDF: { unit:"mm", format:"a4", orientation:"portrait" },
      pagebreak: { mode: [] }
    }).from(clone).save();
  });

  // Função que converte os .card do site em cards compactos para PDF
  function cloneCards(sourceSection, targetDiv) {
    const cards = sourceSection.querySelectorAll(".card");
    cards.forEach(card => targetDiv.appendChild(toCVCard(card)));
  }

  function toCVCard(card) {
    const wrap = document.createElement("div");
    wrap.className = "cv-card";

    const date = card.querySelector(".text-primary, .text-secondary, .fw-bolder")?.textContent?.trim() || "";
    const title = card.querySelector(".small.fw-bolder")?.textContent?.trim() || "";
    const company = card.querySelector(".medium, .small.text-muted a, .small.text-muted")?.textContent?.trim() || "";
    const desc = card.querySelector(".col-lg-8, .col")?.innerText?.trim() || "";

    wrap.innerHTML = `
      <div class="cv-card-title">${title || "Função"}</div>
      <div class="cv-card-sub">${company || ""}</div>
      <div class="cv-card-meta">${date || ""}</div>
      <div class="cv-card-body">${desc}</div>
    `;

    const badges = card.querySelectorAll(".row.row-cols-1.row-cols-md-3 .col .d-flex");
    if (badges.length) {
      const bagDiv = document.createElement("div");
      bagDiv.className = "cv-badges";
      badges.forEach(b => {
        const span = document.createElement("span");
        span.className = "cv-badge";
        span.textContent = b.innerText.trim();
        bagDiv.appendChild(span);
      });
      wrap.appendChild(bagDiv);
    }

    return wrap;
  }
});