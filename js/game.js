(function () {
  const STORAGE_KEY = "portfolio.game.v1";
  const MAIN_QUESTS = [
    "arrive",
    "home",
    "about",
    "resume",
    "cv",
    "projects",
    "inspect",
    "contact",
    "message",
    "bilingual"
  ];

  const QUESTS = [
    { id: "arrive", xp: 10, icon: "bi-compass" },
    { id: "home", xp: 20, icon: "bi-house" },
    { id: "about", xp: 20, icon: "bi-person-lines-fill" },
    { id: "resume", xp: 25, icon: "bi-file-earmark-person" },
    { id: "cv", xp: 40, icon: "bi-download" },
    { id: "projects", xp: 25, icon: "bi-grid" },
    { id: "inspect", xp: 35, icon: "bi-search" },
    { id: "contact", xp: 20, icon: "bi-envelope" },
    { id: "message", xp: 50, icon: "bi-send" },
    { id: "bilingual", xp: 15, icon: "bi-translate" },
    { id: "secret", xp: 30, icon: "bi-stars" },
    { id: "complete", xp: 60, icon: "bi-trophy" }
  ];

  const LEVELS = [
    { min: 0, id: 1, pt: "Visitante", en: "Visitor" },
    { min: 50, id: 2, pt: "Recruta", en: "Scout" },
    { min: 120, id: 3, pt: "Explorador", en: "Explorer" },
    { min: 200, id: 4, pt: "Aliado", en: "Ally" },
    { min: 280, id: 5, pt: "Lenda", en: "Legend" }
  ];

  const COPY = {
    pt: {
      open: "Abrir missões do portfólio",
      close: "Fechar missões",
      title: "Missões",
      subtitle: "Explora o portfólio e sobe de nível.",
      level: "Nível",
      xp: "XP",
      reset: "Repor progresso",
      intro: "Há missões neste portfólio. Explora as páginas e sobe de nível.",
      questDone: "Missão concluída",
      levelUp: "Subiste de nível",
      mapDone: "Mapa completo. És uma lenda deste portfólio.",
      quests: {
        arrive: { title: "Primeiro passo", hint: "Entra no portfólio." },
        home: { title: "Base desbloqueada", hint: "Visita o início." },
        about: { title: "Ler o briefing", hint: "Desce até à secção Sobre mim." },
        resume: { title: "Ficha de personagem", hint: "Abre o currículo." },
        cv: { title: "Artefacto recolhido", hint: "Descarrega o PDF do currículo." },
        projects: { title: "Missões no terreno", hint: "Abre a página de projetos." },
        inspect: { title: "Inspeção completa", hint: "Entra num projeto." },
        contact: { title: "Canal aberto", hint: "Vai à página de contacto." },
        message: { title: "Sinal enviado", hint: "Envia uma mensagem." },
        bilingual: { title: "Modo bilingue", hint: "Troca entre PT e EN." },
        secret: { title: "Easter egg", hint: "Há um segredo no nome do topo." },
        complete: { title: "Mapa completo", hint: "Conclui as missões principais." }
      }
    },
    en: {
      open: "Open portfolio quests",
      close: "Close quests",
      title: "Quests",
      subtitle: "Explore the portfolio and level up.",
      level: "Level",
      xp: "XP",
      reset: "Reset progress",
      intro: "This portfolio has quests. Explore the pages and level up.",
      questDone: "Quest complete",
      levelUp: "Level up",
      mapDone: "Map complete. You are a legend of this portfolio.",
      quests: {
        arrive: { title: "First step", hint: "Enter the portfolio." },
        home: { title: "Base unlocked", hint: "Visit the home page." },
        about: { title: "Read the briefing", hint: "Scroll to the About me section." },
        resume: { title: "Character sheet", hint: "Open the resume." },
        cv: { title: "Artifact collected", hint: "Download the resume PDF." },
        projects: { title: "Field missions", hint: "Open the projects page." },
        inspect: { title: "Full inspection", hint: "Open one project." },
        contact: { title: "Channel open", hint: "Go to the contact page." },
        message: { title: "Signal sent", hint: "Send a message." },
        bilingual: { title: "Bilingual mode", hint: "Switch between PT and EN." },
        secret: { title: "Easter egg", hint: "There is a secret in the name at the top." },
        complete: { title: "Map complete", hint: "Finish the main quests." }
      }
    }
  };

  function isAdminPage() {
    return /admin\.html$/i.test(window.location.pathname);
  }

  function lang() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  }

  function t() {
    return COPY[lang()];
  }

  function fileName() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function pageId() {
    const file = fileName().replace(/\.html$/i, "") || "index";
    if (file === "index" || file === "") return "home";
    if (file === "resume") return "resume";
    if (file === "projects") return "projects";
    if (file === "contact") return "contact";
    return file;
  }

  function defaultState() {
    return { done: {}, logoClicks: 0, introSeen: false };
  }

  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!parsed || typeof parsed !== "object") return defaultState();
      return {
        done: parsed.done && typeof parsed.done === "object" ? parsed.done : {},
        logoClicks: Number(parsed.logoClicks) || 0,
        introSeen: Boolean(parsed.introSeen)
      };
    } catch {
      return defaultState();
    }
  }

  function writeState(nextState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch {}
  }

  function questById(id) {
    return QUESTS.find((quest) => quest.id === id);
  }

  function xpOf(state) {
    return QUESTS.reduce((sum, quest) => sum + (state.done[quest.id] ? quest.xp : 0), 0);
  }

  function levelOf(points) {
    let current = LEVELS[0];
    LEVELS.forEach((level) => {
      if (points >= level.min) current = level;
    });
    return current;
  }

  function nextLevel(points) {
    return LEVELS.find((level) => level.min > points) || null;
  }

  function progressPct(points) {
    const current = levelOf(points);
    const upcoming = nextLevel(points);
    if (!upcoming) return 100;
    const span = upcoming.min - current.min;
    return Math.round(((points - current.min) / span) * 100);
  }

  function mainComplete(state) {
    return MAIN_QUESTS.every((id) => state.done[id]);
  }

  let state = readState();
  let toastTimer = 0;

  function complete(id, options) {
    const silent = Boolean(options && options.silent);
    const quest = questById(id);
    if (!quest || state.done[id]) return false;

    const before = levelOf(xpOf(state));
    const hadComplete = Boolean(state.done.complete);
    state.done[id] = true;
    if (id !== "complete" && mainComplete(state)) {
      state.done.complete = true;
    }
    writeState(state);

    const after = levelOf(xpOf(state));
    const unlockedComplete = !hadComplete && Boolean(state.done.complete);
    render();
    if (!silent) {
      showToast(unlockedComplete ? "complete" : id, after.id > before.id || unlockedComplete);
      pulseHud();
    }
    return true;
  }

  function markIntroSeen() {
    state.introSeen = true;
    writeState(state);
  }

  function resetProgress() {
    state = defaultState();
    writeState(state);
    render();
    complete("arrive", { silent: true });
    const current = pageId();
    if (current === "home" || current === "resume" || current === "projects" || current === "contact") {
      complete(current, { silent: true });
    }
  }

  function showToast(questId, leveled) {
    const root = document.getElementById("gameToast");
    if (!root) return;
    const copy = t();
    const quest = copy.quests[questId];
    const xp = questById(questId)?.xp || 0;
    const title = leveled ? copy.levelUp : (questId === "complete" ? copy.mapDone : copy.questDone);
    const detail = quest ? quest.title + " · +" + xp + " " + copy.xp : "+" + xp + " " + copy.xp;
    root.innerHTML =
      '<strong>' + escapeHtml(title) + '</strong>' +
      '<span>' + escapeHtml(detail) + '</span>';
    root.hidden = false;
    root.classList.remove("is-in");
    void root.offsetWidth;
    root.classList.add("is-in");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      root.classList.remove("is-in");
      root.hidden = true;
    }, 3200);
  }

  function pulseHud() {
    const hud = document.getElementById("gameHudBtn");
    if (!hud) return;
    hud.classList.add("is-pulse");
    window.setTimeout(() => hud.classList.remove("is-pulse"), 900);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildShell() {
    if (document.getElementById("gameRoot")) return;
    const root = document.createElement("div");
    root.id = "gameRoot";
    root.className = "game-root";
    root.innerHTML = [
      '<div id="gameToast" class="game-toast" hidden role="status"></div>',
      '<button type="button" class="game-hud" id="gameHudBtn" aria-expanded="false" aria-controls="gamePanel"></button>',
      '<section class="game-panel" id="gamePanel" hidden></section>'
    ].join("");
    document.body.classList.add("has-game-hud");
    document.body.appendChild(root);
  }

  function renderHud() {
    const btn = document.getElementById("gameHudBtn");
    if (!btn) return;
    const copy = t();
    const points = xpOf(state);
    const level = levelOf(points);
    const pct = progressPct(points);
    const rank = lang() === "pt" ? level.pt : level.en;
    const doneCount = MAIN_QUESTS.filter((id) => state.done[id]).length;
    btn.setAttribute("aria-label", copy.open + ". " + copy.level + " " + level.id + ", " + points + " " + copy.xp);
    btn.innerHTML = [
      '<span class="game-hud__xp">' + pct + '%</span>',
      '<span class="game-hud__copy">',
      '<strong>' + copy.level + " " + level.id + " · " + escapeHtml(rank) + "</strong>",
      '<span>' + points + " " + copy.xp + " · " + doneCount + "/" + MAIN_QUESTS.length + "</span>",
      "</span>",
      '<i class="bi bi-chevron-up" aria-hidden="true"></i>'
    ].join("");
  }

  function renderPanel() {
    const panel = document.getElementById("gamePanel");
    if (!panel) return;
    const copy = t();
    const points = xpOf(state);
    const level = levelOf(points);
    const upcoming = nextLevel(points);
    const rank = lang() === "pt" ? level.pt : level.en;
    const pct = progressPct(points);
    const toNext = upcoming ? upcoming.min - points : 0;
    const nextLabel = upcoming
      ? (lang() === "pt" ? upcoming.pt : upcoming.en)
      : (lang() === "pt" ? "Máximo" : "Max");

    const items = QUESTS.map((quest) => {
      const meta = copy.quests[quest.id];
      const done = Boolean(state.done[quest.id]);
      return [
        '<li class="game-quest' + (done ? " is-done" : "") + '">',
        '<i class="bi ' + quest.icon + '" aria-hidden="true"></i>',
        '<div>',
        '<strong>' + escapeHtml(meta.title) + '</strong>',
        '<span>' + escapeHtml(done ? "+" + quest.xp + " " + copy.xp : meta.hint) + "</span>",
        "</div>",
        '<em>' + (done ? "OK" : quest.xp) + "</em>",
        "</li>"
      ].join("");
    }).join("");

    panel.innerHTML = [
      '<div class="game-panel__head">',
      "<div>",
      "<p>" + copy.title + "</p>",
      "<h2>" + escapeHtml(rank) + "</h2>",
      "<span>" + copy.subtitle + "</span>",
      "</div>",
      '<button type="button" class="game-panel__close" id="gamePanelClose" aria-label="' + copy.close + '"><i class="bi bi-x-lg"></i></button>',
      "</div>",
      '<div class="game-panel__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '">',
      '<span style="width:' + pct + '%"></span>',
      "</div>",
      '<p class="game-panel__meta">' + points + " " + copy.xp + (upcoming ? " · " + toNext + " " + copy.xp + " → " + escapeHtml(nextLabel) : " · " + escapeHtml(nextLabel)) + "</p>",
      '<ol class="game-quest-list">' + items + "</ol>",
      '<button type="button" class="game-reset" id="gameReset">' + copy.reset + "</button>"
    ].join("");
  }

  function render() {
    renderHud();
    renderPanel();
  }

  function setOpen(open) {
    const btn = document.getElementById("gameHudBtn");
    const panel = document.getElementById("gamePanel");
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    document.body.classList.toggle("game-open", open);
  }

  function bindUi() {
    const btn = document.getElementById("gameHudBtn");
    const root = document.getElementById("gameRoot");
    if (!btn || !root) return;

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      setOpen(open);
    });

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("#gamePanelClose")) setOpen(false);
      if (target.closest("#gameReset")) {
        resetProgress();
        setOpen(true);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function bindQuests() {
    const current = pageId();
    complete("arrive", { silent: true });
    if (current === "home" || current === "resume" || current === "projects" || current === "contact") {
      complete(current, { silent: !state.introSeen });
    }
    if (/\/projects\/.+/i.test(window.location.pathname)) {
      complete("inspect", { silent: !state.introSeen });
    }

    if (current === "home") {
      const about = document.querySelector("#aboutTitle, .skill-grid, .section.soft");
      if (about && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.35)) {
            complete("about");
            observer.disconnect();
          }
        }, { threshold: 0.35 });
        observer.observe(about);
      }
    }

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".project-card")) complete("inspect");
    });

    document.querySelectorAll("[data-lang-toggle] [data-lang]").forEach((button) => {
      button.addEventListener("click", () => complete("bilingual"));
    });

    const logo = document.querySelector(".site-logo");
    if (logo) {
      logo.addEventListener("click", () => {
        state.logoClicks += 1;
        writeState(state);
        if (state.logoClicks >= 7) complete("secret");
      });
    }

    window.addEventListener("portfolio:quest", (event) => {
      const id = event.detail && event.detail.id;
      if (typeof id === "string") complete(id);
    });
  }

  function maybeIntro() {
    if (state.introSeen) return;
    const copy = t();
    const root = document.getElementById("gameToast");
    if (!root) return;
    root.innerHTML = "<strong>" + escapeHtml(copy.title) + "</strong><span>" + escapeHtml(copy.intro) + "</span>";
    root.hidden = false;
    root.classList.add("is-in");
    markIntroSeen();
    window.setTimeout(() => {
      root.classList.remove("is-in");
      root.hidden = true;
    }, 4200);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (isAdminPage() || !document.body.classList.contains("site-body")) return;
    buildShell();
    render();
    bindUi();
    bindQuests();
    maybeIntro();
  });
})();
