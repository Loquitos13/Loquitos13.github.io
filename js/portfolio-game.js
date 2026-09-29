(function () {
  const STORAGE_KEY = "portfolio.game.v2";
  const MAIN_QUESTS = ["arrive", "hq", "career", "archive", "field", "comms", "inspect", "cv", "message", "bilingual"];

  const QUESTS = [
    { id: "arrive", xp: 15, icon: "bi-compass" },
    { id: "hq", xp: 20, icon: "bi-cpu" },
    { id: "career", xp: 25, icon: "bi-briefcase" },
    { id: "archive", xp: 20, icon: "bi-journal-bookmark" },
    { id: "field", xp: 25, icon: "bi-grid-3x3-gap" },
    { id: "comms", xp: 20, icon: "bi-broadcast" },
    { id: "inspect", xp: 35, icon: "bi-search" },
    { id: "cv", xp: 40, icon: "bi-download" },
    { id: "message", xp: 50, icon: "bi-send" },
    { id: "bilingual", xp: 15, icon: "bi-translate" },
    { id: "secret", xp: 30, icon: "bi-stars" },
    { id: "complete", xp: 80, icon: "bi-trophy" }
  ];

  const LEVELS = [
    { min: 0, id: 1, pt: "Recruta", en: "Recruit" },
    { min: 60, id: 2, pt: "Operador", en: "Operator" },
    { min: 140, id: 3, pt: "Especialista", en: "Specialist" },
    { min: 220, id: 4, pt: "Veterano", en: "Veteran" },
    { min: 300, id: 5, pt: "Lenda", en: "Legend" }
  ];

  const ZONES = [
    { id: "hq", quest: "hq", x: 50, y: 48, color: "#7dffe1" },
    { id: "career", quest: "career", x: 22, y: 62, color: "#7c87ff" },
    { id: "archive", quest: "archive", x: 78, y: 62, color: "#ff4f8b" },
    { id: "field", quest: "field", x: 50, y: 78, color: "#9aa8ff" },
    { id: "comms", quest: "comms", x: 50, y: 22, color: "#ffb347" },
    { id: "vault", quest: null, x: 88, y: 28, color: "#ffffff" }
  ];

  const COPY = {
    pt: {
      brand: "Diogo Pinto",
      tag: "Chronicle · portfólio gamificado",
      bootTag: "DP.CHRONICLE · INIT",
      bootStart: "Iniciar campanha",
      bootSkip: "Continuar",
      charTitle: "Operador",
      mapTitle: "Mapa de missões",
      questTitle: "Registo de missões",
      level: "Nível",
      xp: "XP",
      questsDone: "Missões",
      zonesDone: "Zonas",
      reset: "Repor campanha",
      close: "Fechar",
      questDone: "Missão concluída",
      levelUp: "Subiste de nível",
      mapDone: "Campanha completa. Operador verificado.",
      modalMeta: "dp-terminal · briefing",
      zones: {
        hq: { title: "Núcleo", sub: "Perfil & loadout" },
        career: { title: "Operações", sub: "Experiência" },
        archive: { title: "Arquivo", sub: "Formação" },
        field: { title: "Campo", sub: "Projectos" },
        comms: { title: "Comms", sub: "Contacto" },
        vault: { title: "Cofre", sub: "PDF & admin" }
      },
      export: "Exportar PDF",
      send: "Enviar mensagem",
      openProject: "Abrir projecto",
      admin: "Painel admin",
      empty: "Sem registos.",
      formName: "Nome",
      formEmail: "Email",
      formMessage: "Mensagem",
      formSubject: "Assunto",
      bootLines: [
        "> carregar dp.chronicle",
        "> sincronizar portfolio-data",
        "> gerar mapa de missões",
        "> operador pronto"
      ],
      quests: {
        arrive: { title: "Entrada", hint: "Inicia a campanha." },
        hq: { title: "Núcleo", hint: "Abre o Núcleo no mapa." },
        career: { title: "Operações", hint: "Visita Operações." },
        archive: { title: "Arquivo", hint: "Visita o Arquivo." },
        field: { title: "Campo", hint: "Explora os projectos." },
        comms: { title: "Comms", hint: "Abre o canal de contacto." },
        inspect: { title: "Inspecção", hint: "Abre um projecto." },
        cv: { title: "Artefacto", hint: "Exporta o PDF." },
        message: { title: "Sinal", hint: "Envia uma mensagem." },
        bilingual: { title: "Bilingue", hint: "Troca PT/EN." },
        secret: { title: "Easter egg", hint: "Clica 7× no avatar." },
        complete: { title: "Campanha", hint: "Conclui as missões principais." }
      }
    },
    en: {
      brand: "Diogo Pinto",
      tag: "Chronicle · gamified portfolio",
      bootTag: "DP.CHRONICLE · INIT",
      bootStart: "Start campaign",
      bootSkip: "Continue",
      charTitle: "Operator",
      mapTitle: "Mission map",
      questTitle: "Quest log",
      level: "Level",
      xp: "XP",
      questsDone: "Quests",
      zonesDone: "Zones",
      reset: "Reset campaign",
      close: "Close",
      questDone: "Quest complete",
      levelUp: "Level up",
      mapDone: "Campaign complete. Operator verified.",
      modalMeta: "dp-terminal · briefing",
      zones: {
        hq: { title: "Core", sub: "Profile & loadout" },
        career: { title: "Operations", sub: "Experience" },
        archive: { title: "Archive", sub: "Education" },
        field: { title: "Field", sub: "Projects" },
        comms: { title: "Comms", sub: "Contact" },
        vault: { title: "Vault", sub: "PDF & admin" }
      },
      export: "Export PDF",
      send: "Send message",
      openProject: "Open project",
      admin: "Admin panel",
      empty: "No records.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubject: "Subject",
      bootLines: [
        "> load dp.chronicle",
        "> sync portfolio-data",
        "> build mission map",
        "> operator ready"
      ],
      quests: {
        arrive: { title: "Entry", hint: "Start the campaign." },
        hq: { title: "Core", hint: "Open Core on the map." },
        career: { title: "Operations", hint: "Visit Operations." },
        archive: { title: "Archive", hint: "Visit the Archive." },
        field: { title: "Field", hint: "Explore projects." },
        comms: { title: "Comms", hint: "Open contact channel." },
        inspect: { title: "Inspection", hint: "Open a project." },
        cv: { title: "Artifact", hint: "Export PDF." },
        message: { title: "Signal", hint: "Send a message." },
        bilingual: { title: "Bilingual", hint: "Switch PT/EN." },
        secret: { title: "Easter egg", hint: "Click avatar 7×." },
        complete: { title: "Campaign", hint: "Finish main quests." }
      }
    }
  };

  let data;
  let state = readState();
  let bootDone = false;
  let toastTimer = 0;

  function lang() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  }

  function base() {
    return lang() === "pt" ? "../" : "";
  }

  function t() {
    return COPY[lang()];
  }

  function txt(obj) {
    return data.getText(obj, lang());
  }

  function defaultState() {
    return { done: {}, zones: {}, logoClicks: 0, bootSeen: false };
  }

  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!parsed || typeof parsed !== "object") return defaultState();
      return {
        done: parsed.done && typeof parsed.done === "object" ? parsed.done : {},
        zones: parsed.zones && typeof parsed.zones === "object" ? parsed.zones : {},
        logoClicks: Number(parsed.logoClicks) || 0,
        bootSeen: Boolean(parsed.bootSeen)
      };
    } catch {
      return defaultState();
    }
  }

  function writeState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  function questById(id) {
    return QUESTS.find((q) => q.id === id);
  }

  function xpOf() {
    return QUESTS.reduce((sum, q) => sum + (state.done[q.id] ? q.xp : 0), 0);
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

  function mainComplete() {
    return MAIN_QUESTS.every((id) => state.done[id]);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function complete(id, options) {
    const silent = Boolean(options && options.silent);
    const quest = questById(id);
    if (!quest || state.done[id]) return false;
    const before = levelOf(xpOf());
    const hadComplete = Boolean(state.done.complete);
    state.done[id] = true;
    if (id !== "complete" && mainComplete()) state.done.complete = true;
    writeState();
    const after = levelOf(xpOf());
    const unlockedComplete = !hadComplete && Boolean(state.done.complete);
    renderHud();
    if (!silent) {
      showToast(unlockedComplete ? "complete" : id, after.id > before.id || unlockedComplete);
    }
    return true;
  }

  function markZone(id) {
    if (!id || state.zones[id]) return;
    state.zones[id] = Date.now();
    writeState();
    updateMapNodes();
  }

  function showToast(questId, leveled) {
    const root = document.getElementById("gameToast");
    if (!root) return;
    const copy = t();
    const meta = copy.quests[questId];
    const xp = questById(questId)?.xp || 0;
    const title = leveled ? copy.levelUp : questId === "complete" ? copy.mapDone : copy.questDone;
    const detail = meta ? meta.title + " · +" + xp + " " + copy.xp : "+" + xp + " " + copy.xp;
    root.innerHTML = "<strong>" + escapeHtml(title) + "</strong><span>" + escapeHtml(detail) + "</span>";
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

  function renderHud() {
    const copy = t();
    const points = xpOf();
    const level = levelOf(points);
    const pct = progressPct(points);
    const rank = lang() === "pt" ? level.pt : level.en;
    const doneCount = MAIN_QUESTS.filter((id) => state.done[id]).length;
    const zoneCount = Object.keys(state.zones).length;

    const xpBar = document.getElementById("gameXpBar");
    if (xpBar) xpBar.style.width = pct + "%";
    const rankEl = document.getElementById("gameRank");
    if (rankEl) rankEl.textContent = rank;
    const metaEl = document.getElementById("gameCharMeta");
    if (metaEl) {
      metaEl.textContent =
        copy.level + " " + level.id + " · " + points + " " + copy.xp + " · " + doneCount + "/" + MAIN_QUESTS.length;
    }
    const statsQuests = document.getElementById("gameStatQuests");
    const statsZones = document.getElementById("gameStatZones");
    if (statsQuests) statsQuests.textContent = String(doneCount);
    if (statsZones) statsZones.textContent = String(zoneCount);

    const list = document.getElementById("gameQuestList");
    if (!list) return;
    list.innerHTML = QUESTS.map((quest) => {
      const meta = copy.quests[quest.id];
      const done = Boolean(state.done[quest.id]);
      return (
        '<li class="game-quest' +
        (done ? " is-done" : "") +
        '">' +
        '<i class="bi ' +
        quest.icon +
        '" aria-hidden="true"></i>' +
        "<div><strong>" +
        escapeHtml(meta.title) +
        "</strong><span>" +
        escapeHtml(done ? "+" + quest.xp + " " + copy.xp : meta.hint) +
        "</span></div>" +
        "<em>" +
        (done ? "OK" : quest.xp) +
        "</em></li>"
      );
    }).join("");
  }

  function renderSkills() {
    const wrap = document.getElementById("gameSkills");
    if (!wrap || !data) return;
    const landing = data.getLanding();
    const skills = landing.skills || [];
    wrap.innerHTML = skills
      .slice(0, 8)
      .map((sk) => "<span>" + escapeHtml(txt(sk.title)) + "</span>")
      .join("");
  }

  function buildMap() {
    const map = document.getElementById("gameMap");
    const lines = document.getElementById("gameMapLines");
    if (!map || !lines) return;
    const copy = t();
    const hub = ZONES.find((z) => z.id === "hq");
    ZONES.forEach((zone) => {
      if (zone.id === "hq" || zone.id === "vault") return;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(hub.x));
      line.setAttribute("y1", String(hub.y));
      line.setAttribute("x2", String(zone.x));
      line.setAttribute("y2", String(zone.y));
      lines.appendChild(line);
    });
    ZONES.forEach((zone) => {
      const meta = copy.zones[zone.id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "game-node";
      btn.dataset.zone = zone.id;
      btn.style.left = zone.x + "%";
      btn.style.top = zone.y + "%";
      btn.style.borderColor = zone.color + "55";
      btn.innerHTML = "<strong>" + escapeHtml(meta.title) + "</strong><span>" + escapeHtml(meta.sub) + "</span>";
      map.appendChild(btn);
    });
    updateMapNodes();
  }

  function updateMapNodes() {
    document.querySelectorAll(".game-node").forEach((node) => {
      const id = node.getAttribute("data-zone");
      node.classList.toggle("is-cleared", Boolean(state.zones[id]));
    });
  }

  function openZone(zoneId) {
    const copy = t();
    const meta = copy.zones[zoneId];
    if (!meta) return;
    markZone(zoneId);
    if (zoneId === "hq") complete("hq");
    if (zoneId === "career") complete("career");
    if (zoneId === "archive") complete("archive");
    if (zoneId === "field") complete("field");
    if (zoneId === "comms") complete("comms");

    let html = "";
    if (zoneId === "hq") html = renderHq();
    else if (zoneId === "career") html = renderCareer();
    else if (zoneId === "archive") html = renderArchive();
    else if (zoneId === "field") html = renderField();
    else if (zoneId === "comms") html = renderComms();
    else if (zoneId === "vault") html = renderVault();
    openModal(meta.title, html);
  }

  function renderHq() {
    const landing = data.getLanding();
    const skills = landing.skills || [];
    const lines = ['// operator.loadout', "const operator = {"];
    lines.push('  name: "Diogo Pinto",');
    lines.push('  role: "' + escapeHtml(txt(landing.hero?.role)) + '",');
    skills.slice(0, 6).forEach((sk, i) => {
      lines.push('  skill_' + String(i + 1).padStart(2, "0") + ': "' + escapeHtml(txt(sk.title)) + '",');
    });
    lines.push("};");
    return (
      '<pre class="game-code">' +
      lines.join("\n") +
      "</pre>" +
      '<p class="lead">' +
      escapeHtml(txt(landing.about?.p1)) +
      "</p>" +
      '<p class="lead">' +
      escapeHtml(txt(landing.about?.p2)) +
      "</p>"
    );
  }

  function renderCareer() {
    const copy = t();
    const jobs = data.getExperiences().filter((e) => e.type !== "internship");
    if (!jobs.length) return "<p>" + copy.empty + "</p>";
    return (
      '<div class="game-cards">' +
      jobs
        .map(
          (item) =>
            '<article class="game-card"><strong>' +
            escapeHtml(txt(item.role)) +
            "</strong><span>" +
            escapeHtml(item.company) +
            " · " +
            escapeHtml(txt(item.period)) +
            "</span><p class=\"lead\">" +
            escapeHtml(txt(item.description)) +
            "</p></article>"
        )
        .join("") +
      "</div>" +
      '<div class="game-btn-row"><button type="button" class="game-btn" id="downloadResumeBtn">' +
      escapeHtml(copy.export) +
      "</button></div>"
    );
  }

  function renderArchive() {
    const copy = t();
    const items = data.getEducation();
    if (!items.length) return "<p>" + copy.empty + "</p>";
    return (
      '<div class="game-cards">' +
      items
        .map(
          (item) =>
            '<article class="game-card"><strong>' +
            escapeHtml(txt(item.degree)) +
            "</strong><span>" +
            escapeHtml(txt(item.institution)) +
            "</span></article>"
        )
        .join("") +
      "</div>"
    );
  }

  function renderField() {
    const copy = t();
    const projects = data.getProjects();
    if (!projects.length) return "<p>" + copy.empty + "</p>";
    return (
      '<div class="game-cards">' +
      projects
        .map((proj) => {
          const href = proj.link ? (proj.link.startsWith("http") ? proj.link : base() + proj.link) : "";
          return (
            '<article class="game-card"><strong>' +
            escapeHtml(proj.title) +
            "</strong><p class=\"lead\">" +
            escapeHtml(txt(proj.description)) +
            '</p><div class="game-tags">' +
            (proj.tags || [])
              .slice(0, 4)
              .map((tag) => "<span>" + escapeHtml(tag) + "</span>")
              .join("") +
            "</div>" +
            (href
              ? '<button type="button" class="game-btn game-btn--ghost" data-project-open="' +
                escapeHtml(proj.id) +
                '">' +
                escapeHtml(copy.openProject) +
                "</button>"
              : "") +
            "</article>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderProjectDetail(id) {
    const copy = t();
    const proj = data.getProjects().find((p) => p.id === id);
    if (!proj) return "<p>" + copy.empty + "</p>";
    complete("inspect");
    const href = proj.link ? (proj.link.startsWith("http") ? proj.link : base() + proj.link) : "";
    return (
      "<h3>" +
      escapeHtml(proj.title) +
      "</h3><p>" +
      escapeHtml(txt(proj.description)) +
      "</p>" +
      (href
        ? '<div class="game-btn-row"><a class="game-btn" href="' +
          escapeHtml(href) +
          '" target="_blank" rel="noopener">' +
          escapeHtml(copy.openProject) +
          "</a></div>"
        : "")
    );
  }

  function renderComms() {
    const copy = t();
    return (
      '<form id="contactForm" class="contact-form">' +
      '<input class="hp-field" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
      "<label>" +
      copy.formName +
      '<input name="name" required /></label>' +
      "<label>" +
      copy.formEmail +
      '<input type="email" name="email" required /></label>' +
      "<label>" +
      copy.formSubject +
      '<input name="subject" /></label>' +
      "<label>" +
      copy.formMessage +
      '<textarea name="message" required></textarea></label>' +
      '<button class="game-btn" type="submit">' +
      escapeHtml(copy.send) +
      "</button>" +
      '<p id="contactStatus" class="form-status"></p></form>'
    );
  }

  function renderVault() {
    const copy = t();
    return (
      '<p class="lead">' +
      (lang() === "pt"
        ? "Exporta o currículo em PDF ou entra no painel de administração."
        : "Export the resume PDF or open the admin panel.") +
      "</p>" +
      '<div class="game-btn-row">' +
      '<button type="button" class="game-btn" id="downloadResumeBtn">' +
      escapeHtml(copy.export) +
      "</button>" +
      '<a class="game-btn game-btn--ghost" href="' +
      escapeHtml(base() + "admin.html") +
      '">' +
      escapeHtml(copy.admin) +
      "</a></div>"
    );
  }

  function openModal(title, html) {
    const modal = document.getElementById("gameModal");
    const body = document.getElementById("gameModalBody");
    const head = document.getElementById("gameModalTitle");
    const meta = document.getElementById("gameModalMeta");
    if (!modal || !body || !head) return;
    head.textContent = title;
    body.innerHTML = html;
    if (meta) meta.textContent = t().modalMeta;
    modal.hidden = false;
    document.body.classList.add("game-modal-open");
    if (window.bindContactFormRetry) window.bindContactFormRetry();
  }

  function closeModal() {
    const modal = document.getElementById("gameModal");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("game-modal-open");
  }

  function runBoot() {
    const copy = t();
    const boot = document.getElementById("gameBoot");
    const log = document.getElementById("gameBootLog");
    const startBtn = document.getElementById("gameBootStart");
    const skipBtn = document.getElementById("gameBootSkip");
    if (!boot || !log) return;

    if (startBtn) startBtn.textContent = copy.bootStart;
    if (skipBtn) skipBtn.textContent = copy.bootSkip;
    skipBtn.hidden = !state.bootSeen;

    const finishBoot = () => {
      boot.classList.add("is-hidden");
      state.bootSeen = true;
      writeState();
      complete("arrive");
      bootDone = true;
      applyDeepLink();
    };

    skipBtn?.addEventListener("click", finishBoot);
    startBtn?.addEventListener("click", finishBoot);

    if (state.bootSeen) {
      boot.classList.add("is-hidden");
      bootDone = true;
      complete("arrive", { silent: true });
      return;
    }

    let i = 0;
    const lines = [];
    const step = () => {
      if (i >= copy.bootLines.length) return;
      lines.push(copy.bootLines[i]);
      log.innerHTML = lines
        .map((line, idx) =>
          idx === lines.length - 1 ? '<span class="ok">' + escapeHtml(line) + "</span>" : escapeHtml(line)
        )
        .join("\n");
      i += 1;
      if (i < copy.bootLines.length) setTimeout(step, 350);
    };
    step();
  }

  function bindUi() {
    document.querySelectorAll("[data-lang-toggle]").forEach((group) => {
      group.addEventListener("click", (e) => {
        const target = e.target.closest("[data-lang]");
        if (!target) return;
        complete("bilingual");
      });
    });

    document.getElementById("gameMap")?.addEventListener("click", (e) => {
      const node = e.target.closest(".game-node");
      if (!node) return;
      openZone(node.getAttribute("data-zone"));
    });

    document.getElementById("gameModalClose")?.addEventListener("click", closeModal);
    document.getElementById("gameModal")?.addEventListener("click", (e) => {
      if (e.target.id === "gameModal") closeModal();
    });

    document.getElementById("gameModalBody")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-project-open]");
      if (!btn) return;
      const id = btn.getAttribute("data-project-open");
      const proj = data.getProjects().find((p) => p.id === id);
      if (proj) openModal(proj.title, renderProjectDetail(id));
    });

    document.getElementById("gameReset")?.addEventListener("click", () => {
      state = defaultState();
      writeState();
      renderHud();
      updateMapNodes();
      complete("arrive", { silent: true });
    });

    document.getElementById("gameAvatar")?.addEventListener("click", () => {
      state.logoClicks += 1;
      writeState();
      if (state.logoClicks >= 7) complete("secret");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    window.addEventListener("portfolio:quest", (event) => {
      const id = event.detail && event.detail.id;
      if (typeof id === "string") complete(id);
    });

    document.addEventListener("click", (e) => {
      if (e.target.closest("#downloadResumeBtn")) complete("cv");
    });
  }

  function applyDeepLink() {
    if (!bootDone) return;
    const params = new URLSearchParams(window.location.search);
    let zone = params.get("zone");
    const spawn = params.get("spawn");
    if (!zone && spawn) {
      if (spawn === "contact") zone = "comms";
      else if (spawn === "projects") zone = "field";
      else if (spawn === "education") zone = "archive";
      else if (spawn === "experience" || spawn === "resume") zone = "career";
      else zone = "hq";
    }
    if (zone && ZONES.some((z) => z.id === zone)) {
      openZone(zone);
    }
  }

  function initCopy() {
    const copy = t();
    document.getElementById("gameBrand").textContent = copy.brand;
    document.getElementById("gameTag").textContent = copy.tag;
    document.getElementById("gameBootTag").textContent = copy.bootTag;
    document.getElementById("gameCharPanelTitle").textContent = copy.charTitle;
    document.getElementById("gameMapTitle").textContent = copy.mapTitle;
    document.getElementById("gameQuestPanelTitle").textContent = copy.questTitle;
    document.getElementById("gameReset").textContent = copy.reset;
    document.getElementById("gameModalClose")?.setAttribute("aria-label", copy.close);
    document.querySelectorAll("[data-lang-toggle] [data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang()));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    data = window.PortfolioData;
    if (!data || !document.body.classList.contains("game-app")) return;
    data.renderResume(lang());
    initCopy();
    buildMap();
    renderSkills();
    renderHud();
    runBoot();
    bindUi();
    if (state.bootSeen) applyDeepLink();
  });
})();
