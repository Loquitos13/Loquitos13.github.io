(function () {
  const BEATS = [
    { year: "2020", kind: "edu", id: "edu-10-11ano", accent: "#8eb6ff", act: "origin" },
    { year: "2022", kind: "edu", id: "edu-12ano", accent: "#c9b6ff", act: "origin" },
    { year: "2023", kind: "exp", id: "exp-normadidatica", accent: "#9aa8ff", act: "craft" },
    { year: "2025", kind: "exp", id: "exp-formafuturo-redesign", accent: "#ff7aa2", act: "field" },
    { year: "2026", kind: "exp", id: "exp-espiraleducada", accent: "#7dffe1", act: "now" }
  ];

  const COPY = {
    pt: {
      origin: "Origem",
      craft: "Ofício",
      field: "Campo",
      now: "Agora",
      hint: "Arrasta a linha para recuar",
      contact: "Contacto",
      close: "Fechar",
      open: "Abrir o trabalho",
      send: "Enviar mensagem",
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem",
      pdf: "CV",
      sheetCase: "Caso",
      sheetContact: "Contacto"
    },
    en: {
      origin: "Origin",
      craft: "Craft",
      field: "Field",
      now: "Now",
      hint: "Drag the line to go back",
      contact: "Contact",
      close: "Close",
      open: "Open the work",
      send: "Send message",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      pdf: "CV",
      sheetCase: "Case",
      sheetContact: "Contact"
    }
  };

  let data;
  let lang = "en";
  let index = BEATS.length - 1;
  let timer = 0;

  function currentLang() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  }

  function base() {
    return lang === "pt" ? "../" : "";
  }

  function t() {
    return COPY[lang];
  }

  function text(obj) {
    return data.getText(obj, lang);
  }

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sentence(value) {
    const clean = String(value || "").replace(/\s+/g, " ").trim();
    const cut = clean.split(/(?<=\.)\s/)[0] || clean;
    return cut.length > 220 ? cut.slice(0, 217) + "…" : cut;
  }

  function beatModel(beat) {
    const copy = t();
    if (beat.kind === "edu") {
      const item = data.getEducation().find((row) => row.id === beat.id);
      if (!item) return null;
      return {
        kicker: copy[beat.act],
        title: text(item.degree),
        meta: [text(item.institution), text(item.location)].filter(Boolean).join(" · "),
        body: sentence(text(item.description))
      };
    }
    const item = data.getExperiences().find((row) => row.id === beat.id);
    if (!item) return null;
    return {
      kicker: copy[beat.act],
      title: text(item.role),
      meta: [item.company, text(item.period)].filter(Boolean).join(" · "),
      body: sentence(text(item.description))
    };
  }

  function paint(next, animate) {
    if (animate && next === index) return;
    const beat = BEATS[next];
    const model = beatModel(beat);
    if (!model) return;
    const copyEl = document.getElementById("focusCopy");
    const apply = () => {
      index = next;
      document.documentElement.style.setProperty("--accent", beat.accent);
      const max = BEATS.length - 1;
      document.documentElement.style.setProperty("--fill", (max === 0 ? 100 : (index / max) * 100) + "%");
      document.getElementById("focusYear").textContent = beat.year;
      document.getElementById("focusKicker").textContent = model.kicker;
      document.getElementById("focusTitle").textContent = model.title;
      document.getElementById("focusMeta").textContent = model.meta;
      document.getElementById("focusBody").textContent = model.body;
      document.getElementById("focusRange").value = String(index);
      document.querySelectorAll("#focusYears button").forEach((btn, i) => {
        btn.classList.toggle("is-on", i === index);
      });
      const hint = document.getElementById("focusHint");
      hint.hidden = index !== BEATS.length - 1;
    };
    if (!animate) {
      apply();
      return;
    }
    copyEl.classList.add("is-out");
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      apply();
      copyEl.classList.remove("is-out");
    }, 160);
  }

  function renderCases() {
    const projects = data.getProjects().slice(0, 3);
    document.getElementById("focusCases").innerHTML = projects.map((proj, i) => {
      const img = proj.image ? base() + proj.image : "";
      const tag = (proj.tags && proj.tags[0]) || "";
      return (
        '<button type="button" class="case" data-project="' + esc(proj.id) + '">' +
        (img ? '<img src="' + esc(img) + '" alt="">' : "") +
        "<span>" + String(i + 1).padStart(2, "0") + "</span>" +
        "<strong>" + esc(proj.title) + "</strong>" +
        "<em>" + esc(tag) + "</em>" +
        "</button>"
      );
    }).join("");
  }

  function openSheet(label, html) {
    document.getElementById("focusSheetLabel").textContent = label;
    document.getElementById("focusSheetBody").innerHTML = html;
    document.getElementById("focusSheet").hidden = false;
    document.body.style.overflow = "hidden";
    if (window.bindContactFormRetry) window.bindContactFormRetry();
  }

  function closeSheet() {
    document.getElementById("focusSheet").hidden = true;
    document.body.style.overflow = "";
  }

  function openProject(id) {
    const proj = data.getProjects().find((row) => row.id === id);
    if (!proj) return;
    const href = proj.link ? (String(proj.link).startsWith("http") ? proj.link : base() + proj.link) : "";
    const tags = (proj.tags || []).map((tag) => "<span>" + esc(tag) + "</span>").join("");
    openSheet(
      t().sheetCase,
      "<h2>" + esc(proj.title) + "</h2>" +
      '<p class="lead">' + esc(text(proj.description)) + "</p>" +
      '<div class="focus-tags">' + tags + "</div>" +
      (href ? '<a class="story-btn" href="' + esc(href) + '">' + esc(t().open) + "</a>" : "")
    );
  }

  function openContact() {
    const copy = t();
    openSheet(
      copy.sheetContact,
      '<form id="contactForm" class="contact-form">' +
      '<input class="hp-field" name="_gotcha" tabindex="-1" autocomplete="off">' +
      "<label>" + copy.name + '<input name="name" required></label>' +
      "<label>" + copy.email + '<input type="email" name="email" required></label>' +
      "<label>" + copy.subject + '<input name="subject"></label>' +
      "<label>" + copy.message + '<textarea name="message" required></textarea></label>' +
      '<button class="story-btn" type="submit">' + esc(copy.send) + "</button>" +
      '<p id="contactStatus" class="form-status"></p></form>'
    );
  }

  function bind() {
    const range = document.getElementById("focusRange");
    range.max = String(BEATS.length - 1);
    range.addEventListener("input", () => paint(Number(range.value), true));
    document.getElementById("focusYears").addEventListener("click", (event) => {
      const btn = event.target.closest("[data-year]");
      if (!btn) return;
      paint(Number(btn.dataset.year), true);
    });
    document.getElementById("focusCases").addEventListener("click", (event) => {
      const btn = event.target.closest("[data-project]");
      if (!btn) return;
      openProject(btn.dataset.project);
    });
    document.getElementById("focusContact").addEventListener("click", openContact);
    document.getElementById("focusSheetClose").addEventListener("click", closeSheet);
    document.getElementById("focusSheet").addEventListener("click", (event) => {
      if (event.target.id === "focusSheet") closeSheet();
    });
    window.addEventListener("keydown", (event) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        if (event.key === "Escape") closeSheet();
        return;
      }
      if (event.key === "Escape") closeSheet();
      if (event.key === "ArrowLeft") paint(Math.max(0, index - 1), true);
      if (event.key === "ArrowRight") paint(Math.min(BEATS.length - 1, index + 1), true);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("focus-app")) return;
    data = window.PortfolioData;
    if (!data) return;
    lang = currentLang();
    data.renderResume(lang);
    const copy = t();
    document.getElementById("focusHint").textContent = copy.hint;
    document.getElementById("focusContact").textContent = copy.contact;
    document.getElementById("downloadResumeBtn").textContent = copy.pdf;
    document.getElementById("focusSheetClose").setAttribute("aria-label", copy.close);
    const landing = data.getLanding();
    const place = text(landing.hero && landing.hero.location);
    if (place) document.getElementById("focusPlace").textContent = place;
    document.getElementById("focusYears").innerHTML = BEATS.map((beat, i) =>
      '<button type="button" data-year="' + i + '">' + beat.year + "</button>"
    ).join("");
    renderCases();
    bind();
    const params = new URLSearchParams(window.location.search);
    const zone = params.get("zone") || params.get("spawn") || "";
    const jump = {
      education: 2,
      archive: 2,
      experience: 4,
      resume: 4,
      career: 4,
      ops: 4,
      projects: 3,
      field: 3
    };
    paint(Object.prototype.hasOwnProperty.call(jump, zone) ? jump[zone] : BEATS.length - 1, false);
    if (zone === "contact" || zone === "comms") openContact();
  });
})();
