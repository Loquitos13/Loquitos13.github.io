(function () {
  const MONTHS = {
    pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  const YEARS = [
    {
      year: "2020",
      accent: "#8eb6ff",
      events: [{ month: 9, kind: "edu", id: "edu-10-11ano", act: "origin", lead: true }]
    },
    {
      year: "2022",
      accent: "#c9b6ff",
      events: [
        {
          month: 6,
          kind: "edu",
          id: "edu-10-11ano",
          act: "origin",
          title: { pt: "Fecha o ciclo em Castelo de Paiva", en: "Closes the Castelo de Paiva years" }
        },
        { month: 9, kind: "edu", id: "edu-12ano", act: "origin", lead: true }
      ]
    },
    {
      year: "2023",
      accent: "#9aa8ff",
      events: [
        { month: 4, kind: "exp", id: "exp-normadidatica", act: "craft", lead: true },
        { month: 9, kind: "edu", id: "edu-licenciatura", act: "craft" }
      ]
    },
    {
      year: "2024",
      accent: "#b7c0ff",
      events: [
        {
          month: 9,
          kind: "edu",
          id: "edu-licenciatura",
          act: "craft",
          lead: true,
          title: { pt: "Licenciatura em curso", en: "Bachelor's in progress" }
        }
      ]
    },
    {
      year: "2025",
      accent: "#ff7aa2",
      events: [
        { month: 1, kind: "exp", id: "exp-formafuturo-1", act: "field" },
        { month: 9, kind: "exp", id: "exp-formafuturo-redesign", act: "field", lead: true }
      ]
    },
    {
      year: "2026",
      accent: "#7dffe1",
      events: [
        { month: 2, kind: "exp", id: "exp-devlop", act: "now" },
        { month: 4, kind: "exp", id: "exp-espiraleducada", act: "now", lead: true },
        {
          month: 7,
          kind: "edu",
          id: "edu-licenciatura",
          act: "now",
          title: { pt: "Licenciatura concluída", en: "Bachelor's completed" }
        },
        { month: 9, kind: "edu", id: "edu-mestrado", act: "now" }
      ]
    }
  ];

  const COPY = {
    pt: {
      origin: "Origem",
      craft: "Ofício",
      field: "Campo",
      now: "Agora",
      hint: "Abre um ano. Recolhe para saltar para outro.",
      fold: "Recolher",
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
      hint: "Open a year. Collapse it to jump to any other.",
      fold: "Collapse",
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
  let openYear = "2026";
  let active = { year: "2026", month: 4, id: "exp-espiraleducada" };
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

  function yearOf(year) {
    return YEARS.find((row) => row.year === year);
  }

  function leadOf(year) {
    const row = yearOf(year);
    if (!row) return null;
    return row.events.find((event) => event.lead) || row.events[row.events.length - 1];
  }

  function sameEvent(a, b) {
    return a && b && a.year === b.year && a.month === b.month && a.id === b.id;
  }

  function eventModel(year, event) {
    const copy = t();
    const record = event.kind === "edu"
      ? data.getEducation().find((row) => row.id === event.id)
      : data.getExperiences().find((row) => row.id === event.id);
    if (!record) return null;
    const month = MONTHS[lang][event.month - 1];
    const fallbackTitle = event.kind === "edu" ? text(record.degree) : text(record.role);
    const place = event.kind === "edu"
      ? [text(record.institution), text(record.location)].filter(Boolean).join(" · ")
      : [record.company, text(record.period)].filter(Boolean).join(" · ");
    return {
      accent: yearOf(year).accent,
      year,
      kicker: copy[event.act] + " · " + month,
      title: event.title ? event.title[lang] : fallbackTitle,
      meta: place,
      body: sentence(text(record.description)),
      short: event.kind === "edu" ? text(record.institution) : (record.companyShort || record.company)
    };
  }

  function renderSpine() {
    const copy = t();
    document.getElementById("focusSpine").innerHTML = YEARS.map((year) => {
      const open = openYear === year.year;
      const current = active && active.year === year.year;
      const events = year.events.map((event) => {
        const model = eventModel(year.year, event);
        if (!model) return "";
        const on = sameEvent(active, { year: year.year, month: event.month, id: event.id });
        return (
          '<button type="button" class="month' + (on ? " is-on" : "") + '" data-year="' + year.year + '" data-month="' + event.month + '" data-id="' + esc(event.id) + '">' +
          "<b>" + esc(MONTHS[lang][event.month - 1]) + "</b><span>" + esc(model.short) + "</span></button>"
        );
      }).join("");
      return (
        '<div class="year' + (open ? " is-open" : "") + (current ? " is-current" : "") + '" data-year="' + year.year + '">' +
        '<button type="button" class="year__main" data-toggle="' + year.year + '" aria-expanded="' + open + '">' +
        "<i></i><b>" + year.year + "</b></button>" +
        '<div class="year__events">' + events +
        '<button type="button" class="year__fold" data-fold="' + year.year + '">' + esc(copy.fold) + "</button></div></div>"
      );
    }).join("");
  }

  function show(year, event, animate) {
    const model = eventModel(year, event);
    if (!model) return;
    const next = { year, month: event.month, id: event.id };
    if (animate && sameEvent(active, next) && openYear === year) return;
    const copyEl = document.getElementById("focusCopy");
    const apply = () => {
      active = next;
      openYear = year;
      document.documentElement.style.setProperty("--accent", model.accent);
      document.getElementById("focusYear").textContent = year;
      document.getElementById("focusKicker").textContent = model.kicker;
      document.getElementById("focusTitle").textContent = model.title;
      document.getElementById("focusMeta").textContent = model.meta;
      document.getElementById("focusBody").textContent = model.body;
      renderSpine();
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

  function toggleYear(year) {
    if (openYear === year) {
      openYear = null;
      renderSpine();
      return;
    }
    const event = leadOf(year);
    if (event) show(year, event, true);
  }

  function step(direction) {
    const yearIndex = YEARS.findIndex((row) => row.year === (active && active.year));
    const year = YEARS[Math.max(0, yearIndex)];
    if (!year) return;
    if (openYear === year.year) {
      const eventIndex = year.events.findIndex((event) => sameEvent(active, { year: year.year, month: event.month, id: event.id }));
      const nextEvent = year.events[eventIndex + direction];
      if (nextEvent) {
        show(year.year, nextEvent, true);
        return;
      }
    }
    const neighbor = YEARS[yearIndex + direction];
    if (!neighbor) return;
    const event = leadOf(neighbor.year);
    if (event) show(neighbor.year, event, true);
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
    document.getElementById("focusSpine").addEventListener("click", (event) => {
      const fold = event.target.closest("[data-fold]");
      if (fold) {
        openYear = null;
        renderSpine();
        return;
      }
      const month = event.target.closest(".month");
      if (month) {
        const year = yearOf(month.dataset.year);
        const item = year && year.events.find((row) => row.month === Number(month.dataset.month) && row.id === month.dataset.id);
        if (item) show(year.year, item, true);
        return;
      }
      const toggle = event.target.closest("[data-toggle]");
      if (toggle) toggleYear(toggle.dataset.toggle);
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
      if (event.key === "Escape") {
        if (!document.getElementById("focusSheet").hidden) closeSheet();
        else if (openYear) {
          openYear = null;
          renderSpine();
        }
        return;
      }
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
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
    renderCases();
    bind();
    const params = new URLSearchParams(window.location.search);
    const zone = params.get("zone") || params.get("spawn") || "";
    const jump = {
      education: { year: "2023", id: "edu-licenciatura" },
      archive: { year: "2023", id: "edu-licenciatura" },
      experience: { year: "2026", id: "exp-espiraleducada" },
      resume: { year: "2026", id: "exp-espiraleducada" },
      career: { year: "2026", id: "exp-espiraleducada" },
      ops: { year: "2026", id: "exp-espiraleducada" },
      projects: { year: "2025", id: "exp-formafuturo-redesign" },
      field: { year: "2025", id: "exp-formafuturo-redesign" }
    };
    const target = jump[zone] || { year: "2026", id: "exp-espiraleducada" };
    const year = yearOf(target.year);
    const event = year && year.events.find((row) => row.id === target.id);
    if (event) show(target.year, event, false);
    if (zone === "contact" || zone === "comms") openContact();
  });
})();
