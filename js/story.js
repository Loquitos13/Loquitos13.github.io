(function () {
  const ORDER = [
    { kind: "prologue", act: "line" },
    { kind: "edu", id: "edu-10-11ano", act: "origin", year: "2020" },
    { kind: "edu", id: "edu-12ano", act: "origin", year: "2022" },
    { kind: "exp", id: "exp-normadidatica", act: "craft", year: "2023" },
    { kind: "edu", id: "edu-licenciatura", act: "craft", year: "2023" },
    { kind: "exp", id: "exp-formafuturo-1", act: "field", year: "2025" },
    { kind: "exp", id: "exp-formafuturo-redesign", act: "field", year: "2025" },
    { kind: "projects", act: "field", year: "2025" },
    { kind: "exp", id: "exp-devlop", act: "now", year: "2026" },
    { kind: "exp", id: "exp-espiraleducada", act: "now", year: "2026" },
    { kind: "edu", id: "edu-mestrado", act: "now", year: "2026" },
    { kind: "epilogue", act: "now" }
  ];

  const ACTS = {
    pt: {
      line: "A linha",
      origin: "Acto I · Origem",
      craft: "Acto II · Ofício",
      field: "Acto III · Campo",
      now: "Acto IV · Agora",
      projectsTitle: "Três peças que ficaram de pé",
      projectsBody: "Entre contratos, estes sistemas continuam a contar o trabalho: formação, loja e oficina.",
      next: "Capítulo seguinte",
      count: "Capítulo",
      brand: "A linha",
      pdf: "Descarregar CV",
      mail: "Email",
      send: "Enviar mensagem",
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem"
    },
    en: {
      line: "The line",
      origin: "Act I · Origin",
      craft: "Act II · Craft",
      field: "Act III · Field",
      now: "Act IV · Now",
      projectsTitle: "Three pieces still standing",
      projectsBody: "Between contracts, these systems keep the work visible: training, a shop, and a workshop.",
      next: "Next chapter",
      count: "Chapter",
      brand: "The line",
      pdf: "Download CV",
      mail: "Email",
      send: "Send message",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message"
    }
  };

  let data;
  let lang = "en";
  let scenes = [];

  function currentLang() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  }

  function base() {
    return lang === "pt" ? "../" : "";
  }

  function copy() {
    return ACTS[lang];
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

  function findEdu(id) {
    return data.getEducation().find((item) => item.id === id);
  }

  function findExp(id) {
    return data.getExperiences().find((item) => item.id === id);
  }

  function chapterModel(spec) {
    const t = copy();
    if (spec.kind === "prologue") {
      const landing = data.getLanding();
      return {
        act: t.line,
        year: "",
        title: "Diogo Pinto",
        place: text(landing.hero?.location),
        body: [text(landing.about?.p1), text(landing.about?.p2)].filter(Boolean).join(" "),
        rail: t.line
      };
    }
    if (spec.kind === "edu") {
      const item = findEdu(spec.id);
      if (!item) return null;
      return {
        act: t[spec.act],
        year: spec.year,
        title: text(item.degree),
        place: [text(item.institution), text(item.location), text(item.period)].filter(Boolean).join(" · "),
        body: text(item.description),
        rail: spec.year
      };
    }
    if (spec.kind === "exp") {
      const item = findExp(spec.id);
      if (!item) return null;
      return {
        act: t[spec.act],
        year: spec.year,
        title: text(item.role),
        place: [item.company, text(item.period), text(item.sub)].filter(Boolean).join(" · "),
        body: text(item.description),
        tags: item.tags || [],
        href: item.url || "",
        rail: spec.year
      };
    }
    if (spec.kind === "projects") {
      return {
        act: t[spec.act],
        year: spec.year,
        title: t.projectsTitle,
        place: "",
        body: t.projectsBody,
        projects: data.getProjects(),
        rail: spec.year
      };
    }
    const landing = data.getLanding();
    return {
      act: t[spec.act],
      year: "",
      title: text(landing.cta?.title) || t.now,
      place: "bdiogo511@gmail.com",
      body: text(landing.about?.p2),
      epilogue: true,
      rail: t.now
    };
  }

  function projectCard(proj) {
    const href = proj.link ? (String(proj.link).startsWith("http") ? proj.link : base() + proj.link) : "";
    const img = proj.image ? base() + proj.image : "";
    const inner =
      (img ? '<img src="' + esc(img) + '" alt="">' : "") +
      "<div><strong>" + esc(proj.title) + "</strong><p>" + esc(text(proj.description)).slice(0, 140) + "</p></div>";
    if (!href) return '<article class="beat">' + inner + "</article>";
    return '<a class="beat" href="' + esc(href) + '">' + inner + "</a>";
  }

  function sceneHtml(model, index, total, spec) {
    const t = copy();
    const key = spec.id || spec.kind;
    const tags = (model.tags || []).map((tag) => "<span>" + esc(tag) + "</span>").join("");
    const projects = (model.projects || []).map(projectCard).join("");
    const link = model.href
      ? '<div class="story-cta"><a class="story-btn" href="' + esc(model.href) + '" target="_blank" rel="noopener">↗</a></div>'
      : "";
    const end = model.epilogue
      ? '<form id="contactForm" class="contact-form">' +
        '<input class="hp-field" name="_gotcha" tabindex="-1" autocomplete="off">' +
        "<label>" + t.name + '<input name="name" required></label>' +
        "<label>" + t.email + '<input type="email" name="email" required></label>' +
        "<label>" + t.subject + '<input name="subject"></label>' +
        "<label>" + t.message + '<textarea name="message" required></textarea></label>' +
        '<button class="story-btn" type="submit">' + esc(t.send) + "</button>" +
        '<p id="contactStatus" class="form-status"></p></form>' +
        '<div class="story-cta"><button type="button" class="story-btn story-btn--ghost" id="downloadResumeBtn">' + esc(t.pdf) + "</button></div>"
      : "";
    const next = index < total - 1
      ? '<button type="button" class="scene__next" data-next="' + (index + 1) + '" aria-label="' + esc(t.next) + '">↓</button>'
      : "";
    return (
      '<section class="scene" id="scene-' + index + '" data-index="' + index + '" data-key="' + esc(key) + '">' +
      '<div class="scene__inner">' +
      '<p class="scene__act">' + esc(model.act) + "</p>" +
      (model.year ? '<p class="scene__year">' + esc(model.year) + "</p>" : "") +
      '<h2 class="scene__title">' + esc(model.title) + "</h2>" +
      (model.place ? '<p class="scene__place">' + esc(model.place) + "</p>" : "") +
      '<p class="scene__body">' + esc(model.body) + "</p>" +
      (tags ? '<div class="scene__tags">' + tags + "</div>" : "") +
      (projects ? '<div class="beats">' + projects + "</div>" : "") +
      link +
      end +
      "</div>" + next + "</section>"
    );
  }

  function render() {
    const t = copy();
    const built = ORDER.map((spec) => ({ spec, model: chapterModel(spec) })).filter((item) => item.model);
    scenes = built.map((item) => item.model);
    const root = document.getElementById("storyScroll");
    const rail = document.getElementById("storyRail");
    root.innerHTML = built.map((item, i) => sceneHtml(item.model, i, built.length, item.spec)).join("");
    rail.innerHTML = scenes.map((model, i) =>
      '<button type="button" data-go="' + i + '" aria-label="' + esc(model.title) + '"><span>' + esc(model.rail || String(i + 1)) + "</span></button>"
    ).join("");
    document.getElementById("storyBrandSub").textContent = t.brand;
    document.getElementById("storyPdf").textContent = t.pdf;
    const params = new URLSearchParams(window.location.search);
    const zone = params.get("zone") || params.get("spawn") || "";
    const alias = {
      contact: "epilogue",
      comms: "epilogue",
      projects: "projects",
      field: "projects",
      experience: "exp-espiraleducada",
      resume: "exp-espiraleducada",
      career: "exp-espiraleducada",
      ops: "exp-espiraleducada",
      education: "edu-licenciatura",
      archive: "edu-licenciatura"
    };
    const key = alias[zone];
    const jumped = key ? [...root.querySelectorAll(".scene")].findIndex((el) => el.dataset.key === key) : -1;
    const saved = Number(sessionStorage.getItem("story.chapter") || 0);
    const start = jumped >= 0 ? jumped : (Number.isFinite(saved) ? Math.min(Math.max(saved, 0), scenes.length - 1) : 0);
    window.requestAnimationFrame(() => go(start, false));
    if (window.bindContactFormRetry) window.bindContactFormRetry();
    document.getElementById("storyPdf").addEventListener("click", () => {
      const btn = document.getElementById("downloadResumeBtn");
      if (btn) btn.click();
    });
  }

  function go(index, smooth) {
    const el = document.getElementById("scene-" + index);
    if (!el) return;
    el.scrollIntoView({ behavior: smooth === false ? "auto" : "smooth", block: "start" });
  }

  function setActive(index) {
    document.querySelectorAll(".scene").forEach((scene) => {
      scene.classList.toggle("is-active", Number(scene.dataset.index) === index);
    });
    document.querySelectorAll("#storyRail button").forEach((btn, i) => {
      btn.classList.toggle("is-current", i === index);
      btn.classList.toggle("is-done", i < index);
    });
    const fill = document.getElementById("storyProgress");
    const count = document.getElementById("storyCount");
    const t = copy();
    const pct = scenes.length <= 1 ? 100 : Math.round((index / (scenes.length - 1)) * 100);
    if (fill) fill.style.width = pct + "%";
    if (count) count.textContent = t.count + " " + String(index + 1).padStart(2, "0") + " / " + String(scenes.length).padStart(2, "0");
    try { sessionStorage.setItem("story.chapter", String(index)); } catch {}
  }

  function bind() {
    const scroller = document.getElementById("storyScroll");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      setActive(Number(visible.target.dataset.index) || 0);
    }, { root: scroller, threshold: [0.55, 0.75] });
    scroller.querySelectorAll(".scene").forEach((scene) => observer.observe(scene));

    document.getElementById("storyRail").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-go]");
      if (!btn) return;
      go(Number(btn.dataset.go));
    });
    scroller.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-next]");
      if (!btn) return;
      go(Number(btn.dataset.next));
    });
    window.addEventListener("keydown", (e) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const current = Number(sessionStorage.getItem("story.chapter") || 0);
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(Math.min(scenes.length - 1, current + 1));
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(Math.max(0, current - 1));
      }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(scenes.length - 1);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("story-app")) return;
    data = window.PortfolioData;
    if (!data) return;
    lang = currentLang();
    data.renderResume(lang);
    render();
    bind();
    document.querySelectorAll("[data-lang-toggle] [data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  });
})();
