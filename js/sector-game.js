/**
 * SECTOR — top-down extraction game.
 *
 * Loop: move through a planned facility, read five data nodes, survive glitch
 * patrols, open the vault, export the CV.
 *
 * Layout (tile grid, carved in buildMap):
 *   NW Comms · NE Vault (gated) · W Operations · Center Hub · E Archive · S Field
 * Corridors join the rooms. Vault door stays solid until the five nodes are read.
 */
(function () {
  const TILE = 36;
  const STORAGE_KEY = "portfolio.sector.v1";
  const NODES = ["hub", "ops", "archive", "field", "comms"];

  const COPY = {
    pt: {
      title: "Diogo Pinto",
      tag: "SECTOR",
      bootTitle: "Extracção de sector",
      bootText: "Entra na instalação, lê os cinco nós de dados e abre o cofre. WASD para mover. E nos terminais.",
      bootBtn: "Entrar no sector",
      skip: "Continuar",
      objective: "Lê os cinco nós e abre o cofre.",
      objectiveVault: "Cofre aberto. Exporta o CV.",
      objectiveDone: "Sector limpo. Operador verificado.",
      hintMove: "WASD mover · aproxima-te de um terminal",
      hintUse: "E · ",
      close: "Fechar",
      export: "Exportar PDF",
      send: "Enviar mensagem",
      open: "Abrir",
      admin: "Admin",
      locked: "Cofre trancado. Faltam nós.",
      synced: "Nó lido",
      vaultOpen: "Porta do cofre aberta",
      win: "CV extraído. Fim de corrida.",
      hit: "Glitch — recua",
      empty: "Sem registos.",
      log: "Nós",
      nodes: { hub: "Núcleo", ops: "Operações", archive: "Arquivo", field: "Campo", comms: "Comms", vault: "Cofre" },
      rooms: { hub: "Núcleo", ops: "Operações", archive: "Arquivo", field: "Campo", comms: "Comunicações", vault: "Cofre", hall: "Corredor" },
      formName: "Nome",
      formEmail: "Email",
      formSubject: "Assunto",
      formMessage: "Mensagem",
      bootLines: ["> mapear sector", "> ligar terminais", "> patrulha de glitches activa", "> operador no átrio"]
    },
    en: {
      title: "Diogo Pinto",
      tag: "SECTOR",
      bootTitle: "Sector extraction",
      bootText: "Enter the facility, read five data nodes, and open the vault. WASD to move. E at terminals.",
      bootBtn: "Enter sector",
      skip: "Continue",
      objective: "Read the five nodes and open the vault.",
      objectiveVault: "Vault open. Export the CV.",
      objectiveDone: "Sector clear. Operator verified.",
      hintMove: "WASD move · walk up to a terminal",
      hintUse: "E · ",
      close: "Close",
      export: "Export PDF",
      send: "Send message",
      open: "Open",
      admin: "Admin",
      locked: "Vault locked. Nodes remaining.",
      synced: "Node read",
      vaultOpen: "Vault door open",
      win: "CV extracted. Run complete.",
      hit: "Glitch — fall back",
      empty: "No records.",
      log: "Nodes",
      nodes: { hub: "Core", ops: "Operations", archive: "Archive", field: "Field", comms: "Comms", vault: "Vault" },
      rooms: { hub: "Core", ops: "Operations", archive: "Archive", field: "Field", comms: "Comms", vault: "Vault", hall: "Corridor" },
      formName: "Name",
      formEmail: "Email",
      formSubject: "Subject",
      formMessage: "Message",
      bootLines: ["> map sector", "> bring terminals online", "> glitch patrol live", "> operator in the atrium"]
    }
  };

  const keys = {};
  const state = {
    lang: "en",
    base: "",
    playing: false,
    modal: false,
    nodes: {},
    won: false,
    bootSeen: false
  };

  let data;
  let grid = [];
  let W = 0;
  let H = 0;
  let rooms = [];
  let terminals = [];
  let glitches = [];
  let player;
  let camera = { x: 0, y: 0 };
  let canvas;
  let ctx;
  let mini;
  let miniCtx;
  let nearest = null;
  let toastTimer = 0;
  let flash = 0;
  let stick = { x: 0, y: 0, on: false };

  function lang() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  }

  function t() {
    return COPY[state.lang];
  }

  function txt(obj) {
    return data.getText(obj, state.lang);
  }

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadSave() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!raw) return;
      state.nodes = raw.nodes && typeof raw.nodes === "object" ? raw.nodes : {};
      state.won = Boolean(raw.won);
      state.bootSeen = Boolean(raw.bootSeen);
    } catch {}
  }

  function save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ nodes: state.nodes, won: state.won, bootSeen: state.bootSeen })
      );
    } catch {}
  }

  function carve(g, x, y, w, h) {
    for (let r = y; r < y + h; r += 1) {
      for (let c = x; c < x + w; c += 1) {
        if (g[r] && g[r][c] !== undefined) g[r][c] = ".";
      }
    }
  }

  function buildMap() {
    W = 46;
    H = 30;
    grid = Array.from({ length: H }, () => Array(W).fill("#"));
    carve(grid, 3, 2, 14, 8); // comms
    carve(grid, 29, 2, 14, 8); // vault
    carve(grid, 3, 12, 12, 8); // ops
    carve(grid, 17, 11, 12, 9); // hub
    carve(grid, 31, 12, 12, 8); // archive
    carve(grid, 12, 22, 22, 6); // field
    carve(grid, 17, 6, 12, 5); // north hall into hub
    carve(grid, 8, 8, 30, 3); // spine between comms and vault
    carve(grid, 15, 14, 2, 4); // ops → hub
    carve(grid, 29, 14, 2, 4); // hub → archive
    carve(grid, 21, 20, 4, 2); // hub → field
    // Vault gate: re-seal the spine entrance on the vault's west edge.
    for (let r = 8; r <= 10; r += 1) grid[r][29] = "D";

    rooms = [
      { id: "comms", x: 3, y: 2, w: 14, h: 8 },
      { id: "vault", x: 29, y: 2, w: 14, h: 8 },
      { id: "ops", x: 3, y: 12, w: 12, h: 8 },
      { id: "hub", x: 17, y: 11, w: 12, h: 9 },
      { id: "archive", x: 31, y: 12, w: 12, h: 8 },
      { id: "field", x: 12, y: 22, w: 22, h: 6 }
    ];

    const center = (room) => ({
      x: (room.x + room.w / 2) * TILE,
      y: (room.y + room.h / 2) * TILE
    });
    const byId = Object.fromEntries(rooms.map((room) => [room.id, room]));
    terminals = ["hub", "ops", "archive", "field", "comms", "vault"].map((id) => {
      const spot = center(byId[id]);
      return { id, x: spot.x, y: spot.y, r: 18 };
    });

    const hub = center(byId.hub);
    player = { x: hub.x, y: hub.y + 28, r: 12, invuln: 0 };

    const spineY = 9.5 * TILE;
    glitches = [
      {
        x: 12 * TILE,
        y: spineY,
        r: 11,
        speed: 70,
        i: 0,
        path: [
          { x: 12 * TILE, y: spineY },
          { x: 26 * TILE, y: spineY }
        ]
      },
      {
        x: 16 * TILE,
        y: 24.5 * TILE,
        r: 11,
        speed: 62,
        i: 0,
        path: [
          { x: 16 * TILE, y: 24.5 * TILE },
          { x: 30 * TILE, y: 24.5 * TILE }
        ]
      }
    ];

    if (nodesDone()) openVaultDoor();
  }

  function tileAt(px, py) {
    const c = Math.floor(px / TILE);
    const r = Math.floor(py / TILE);
    if (r < 0 || c < 0 || r >= H || c >= W) return "#";
    return grid[r][c];
  }

  function blocked(px, py, radius) {
    for (let i = 0; i < 8; i += 1) {
      const a = (i / 8) * Math.PI * 2;
      const ch = tileAt(px + Math.cos(a) * radius, py + Math.sin(a) * radius);
      if (ch === "#" || ch === "D") return true;
    }
    return false;
  }

  function tryMove(nx, ny) {
    if (!blocked(nx, player.y, player.r)) player.x = nx;
    if (!blocked(player.x, ny, player.r)) player.y = ny;
  }

  function nodesDone() {
    return NODES.every((id) => state.nodes[id]);
  }

  function syncPct() {
    const done = NODES.filter((id) => state.nodes[id]).length;
    return Math.round((done / NODES.length) * 100);
  }

  function openVaultDoor() {
    for (let r = 0; r < H; r += 1) {
      for (let c = 0; c < W; c += 1) {
        if (grid[r][c] === "D") grid[r][c] = ".";
      }
    }
  }

  function roomAt(px, py) {
    const c = px / TILE;
    const r = py / TILE;
    const hit = rooms.find((room) => c >= room.x && c < room.x + room.w && r >= room.y && r < room.y + room.h);
    return hit ? hit.id : "hall";
  }

  function readNode(id) {
    if (id === "vault" || state.nodes[id]) return;
    const wasOpen = nodesDone();
    state.nodes[id] = Date.now();
    save();
    renderHud();
    showToast(t().synced + " · " + t().nodes[id]);
    if (!wasOpen && nodesDone()) {
      openVaultDoor();
      showToast(t().vaultOpen);
    }
  }

  function showToast(message) {
    const el = document.getElementById("sectorToast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-in");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.classList.remove("is-in"), 2200);
  }

  function renderHud() {
    const copy = t();
    const pct = syncPct();
    const fill = document.getElementById("sectorSyncFill");
    const label = document.getElementById("sectorSyncLabel");
    const obj = document.getElementById("sectorObjective");
    const room = document.getElementById("sectorRoom");
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = pct + "%";
    if (room && player) room.textContent = copy.rooms[roomAt(player.x, player.y)] || copy.tag;
    if (obj) {
      obj.textContent = state.won ? copy.objectiveDone : nodesDone() ? copy.objectiveVault : copy.objective;
    }
    const list = document.getElementById("sectorLogList");
    if (list) {
      list.innerHTML = NODES.map((id) => {
        const done = Boolean(state.nodes[id]);
        return '<li class="' + (done ? "is-done" : "") + '">' + (done ? "● " : "○ ") + esc(copy.nodes[id]) + "</li>";
      }).join("") + '<li class="' + (nodesDone() ? "is-done" : "") + '">' + (nodesDone() ? "● " : "○ ") + esc(copy.nodes.vault) + "</li>";
    }
    document.getElementById("sectorLogTitle").textContent = copy.log;
  }

  function dossier(id) {
    const copy = t();
    if (id === "hub") {
      const landing = data.getLanding();
      const skills = landing.skills || [];
      const lines = ["const operator = {", '  name: "Diogo Pinto",'];
      skills.slice(0, 6).forEach((sk, i) => {
        lines.push("  s" + String(i + 1).padStart(2, "0") + ': "' + txt(sk.title) + '",');
      });
      lines.push("};");
      return (
        '<pre class="sector-code">' + esc(lines.join("\n")) + "</pre>" +
        '<p class="lead">' + esc(txt(landing.about?.p1)) + "</p>" +
        '<p class="lead">' + esc(txt(landing.about?.p2)) + "</p>"
      );
    }
    if (id === "ops") {
      const jobs = data.getExperiences().filter((item) => item.type !== "internship");
      if (!jobs.length) return "<p>" + copy.empty + "</p>";
      return (
        '<div class="sector-cards">' +
        jobs.map((item) =>
          '<article class="sector-card"><strong>' + esc(txt(item.role)) + "</strong><span>" +
          esc(item.company) + " · " + esc(txt(item.period)) + "</span><p class=\"lead\">" +
          esc(txt(item.description)) + "</p></article>"
        ).join("") +
        "</div>"
      );
    }
    if (id === "archive") {
      const items = data.getEducation();
      if (!items.length) return "<p>" + copy.empty + "</p>";
      return (
        '<div class="sector-cards">' +
        items.map((item) =>
          '<article class="sector-card"><strong>' + esc(txt(item.degree)) + "</strong><span>" +
          esc(txt(item.institution)) + "</span></article>"
        ).join("") +
        "</div>"
      );
    }
    if (id === "field") {
      const projects = data.getProjects();
      if (!projects.length) return "<p>" + copy.empty + "</p>";
      return (
        '<div class="sector-cards">' +
        projects.map((proj) =>
          '<article class="sector-card"><strong>' + esc(proj.title) + '</strong><p class="lead">' +
          esc(txt(proj.description)) + '</p><div class="sector-tags">' +
          (proj.tags || []).slice(0, 4).map((tag) => "<span>" + esc(tag) + "</span>").join("") +
          '</div><div class="sector-row"><button type="button" class="sector-btn sector-btn--ghost" data-project="' +
          esc(proj.id) + '">' + esc(copy.open) + "</button></div></article>"
        ).join("") +
        "</div>"
      );
    }
    if (id === "comms") {
      return (
        '<form id="contactForm" class="contact-form">' +
        '<input class="hp-field" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />' +
        "<label>" + copy.formName + '<input name="name" required></label>' +
        "<label>" + copy.formEmail + '<input type="email" name="email" required></label>' +
        "<label>" + copy.formSubject + '<input name="subject"></label>' +
        "<label>" + copy.formMessage + '<textarea name="message" required></textarea></label>' +
        '<button class="sector-btn" type="submit">' + esc(copy.send) + "</button>" +
        '<p id="contactStatus" class="form-status"></p></form>'
      );
    }
    if (id === "vault") {
      if (!nodesDone()) return '<p class="lead">' + esc(copy.locked) + "</p>";
      return (
        '<p class="lead">' + esc(copy.objectiveVault) + "</p>" +
        '<div class="sector-row">' +
        '<button type="button" class="sector-btn" id="downloadResumeBtn">' + esc(copy.export) + "</button>" +
        '<a class="sector-btn sector-btn--ghost" href="' + esc(state.base + "admin.html") + '">' + esc(copy.admin) + "</a>" +
        "</div>"
      );
    }
    return "";
  }

  function projectDetail(id) {
    const copy = t();
    const proj = data.getProjects().find((item) => item.id === id);
    if (!proj) return "<p>" + copy.empty + "</p>";
    const href = proj.link ? (String(proj.link).startsWith("http") ? proj.link : state.base + proj.link) : "";
    return (
      "<h3>" + esc(proj.title) + "</h3><p class=\"lead\">" + esc(txt(proj.description)) + "</p>" +
      (href ? '<div class="sector-row"><a class="sector-btn" target="_blank" rel="noopener" href="' + esc(href) + '">' + esc(copy.open) + "</a></div>" : "")
    );
  }

  function openModal(title, html) {
    state.modal = true;
    document.getElementById("sectorModalTitle").textContent = title;
    document.getElementById("sectorModalBody").innerHTML = html;
    document.getElementById("sectorModal").hidden = false;
    if (window.bindContactFormRetry) window.bindContactFormRetry();
  }

  function closeModal() {
    state.modal = false;
    document.getElementById("sectorModal").hidden = true;
  }

  function useTerminal(term) {
    if (!term) return;
    if (term.id === "vault" && !nodesDone()) {
      showToast(t().locked);
      openModal(t().nodes.vault, dossier("vault"));
      return;
    }
    if (term.id !== "vault") readNode(term.id);
    openModal(t().nodes[term.id], dossier(term.id));
  }

  function updateNearest() {
    let best = null;
    let bestD = 64;
    terminals.forEach((term) => {
      const d = Math.hypot(term.x - player.x, term.y - player.y);
      if (d < bestD) {
        bestD = d;
        best = term;
      }
    });
    nearest = best;
    const hint = document.getElementById("sectorHint");
    if (!hint) return;
    if (!state.playing || state.modal) {
      hint.hidden = true;
      return;
    }
    hint.hidden = false;
    hint.textContent = nearest ? t().hintUse + t().nodes[nearest.id] : t().hintMove;
  }

  function updateGlitches(dt) {
    glitches.forEach((g) => {
      const target = g.path[g.i];
      const dx = target.x - g.x;
      const dy = target.y - g.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 6) g.i = (g.i + 1) % g.path.length;
      else {
        g.x += (dx / dist) * g.speed * dt;
        g.y += (dy / dist) * g.speed * dt;
      }
      if (state.playing && !state.modal && player.invuln <= 0 && Math.hypot(player.x - g.x, player.y - g.y) < player.r + g.r) {
        player.invuln = 0.9;
        const ang = Math.atan2(player.y - g.y, player.x - g.x);
        tryMove(player.x + Math.cos(ang) * 36, player.y + Math.sin(ang) * 36);
        flash = 1;
        showToast(t().hit);
      }
    });
  }

  function updatePlayer(dt) {
    if (!state.playing || state.modal) return;
    let x = 0;
    let y = 0;
    if (keys.KeyW || keys.ArrowUp) y -= 1;
    if (keys.KeyS || keys.ArrowDown) y += 1;
    if (keys.KeyA || keys.ArrowLeft) x -= 1;
    if (keys.KeyD || keys.ArrowRight) x += 1;
    if (stick.on) {
      x += stick.x;
      y += stick.y;
    }
    const len = Math.hypot(x, y);
    if (len > 0) {
      const speed = (keys.ShiftLeft || keys.ShiftRight ? 250 : 168) * dt;
      tryMove(player.x + (x / len) * speed, player.y + (y / len) * speed);
    }
    if (player.invuln > 0) player.invuln -= dt;
  }

  function updateCamera() {
    const viewW = canvas.width;
    const viewH = canvas.height;
    const worldW = W * TILE;
    const worldH = H * TILE;
    const tx = player.x - viewW / 2;
    const ty = player.y - viewH / 2;
    camera.x += (tx - camera.x) * 0.12;
    camera.y += (ty - camera.y) * 0.12;
    camera.x = Math.max(0, Math.min(worldW - viewW, camera.x));
    camera.y = Math.max(0, Math.min(worldH - viewH, camera.y));
    if (worldW < viewW) camera.x = (worldW - viewW) / 2;
    if (worldH < viewH) camera.y = (worldH - viewH) / 2;
  }

  function draw() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.floor(canvas.clientWidth * dpr) || canvas.height !== Math.floor(canvas.clientHeight * dpr)) {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.fillStyle = "#070b12";
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    const x0 = Math.max(0, Math.floor(camera.x / TILE) - 1);
    const y0 = Math.max(0, Math.floor(camera.y / TILE) - 1);
    const x1 = Math.min(W, Math.ceil((camera.x + w) / TILE) + 1);
    const y1 = Math.min(H, Math.ceil((camera.y + h) / TILE) + 1);
    for (let r = y0; r < y1; r += 1) {
      for (let c = x0; c < x1; c += 1) {
        const ch = grid[r][c];
        const x = c * TILE;
        const y = r * TILE;
        if (ch === "#") {
          ctx.fillStyle = "#121826";
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = "#1c2638";
          ctx.fillRect(x, y, TILE, 4);
        } else if (ch === "D") {
          ctx.fillStyle = "#1a1208";
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = "#ffb347";
          ctx.fillRect(x + 6, y, 4, TILE);
          ctx.fillRect(x + TILE - 10, y, 4, TILE);
        } else {
          ctx.fillStyle = (r + c) % 2 === 0 ? "#0c121c" : "#0e1522";
          ctx.fillRect(x, y, TILE, TILE);
        }
      }
    }

    rooms.forEach((room) => {
      ctx.fillStyle = "rgba(125,255,225,0.45)";
      ctx.font = "12px IBM Plex Mono, monospace";
      ctx.fillText(t().rooms[room.id] || room.id, room.x * TILE + 8, room.y * TILE + 16);
    });

    terminals.forEach((term) => {
      const on = Boolean(state.nodes[term.id]) || (term.id === "vault" && nodesDone());
      ctx.fillStyle = term === nearest ? "#7dffe1" : on ? "#3d8f86" : "#243044";
      ctx.fillRect(term.x - 14, term.y - 16, 28, 22);
      ctx.fillStyle = "#070b12";
      ctx.fillRect(term.x - 10, term.y - 12, 20, 10);
    });

    glitches.forEach((g) => {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(performance.now() / 280);
      ctx.fillStyle = "#ff4f6a";
      ctx.fillRect(-8, -8, 16, 16);
      ctx.restore();
    });

    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.globalAlpha = player.invuln > 0 && Math.floor(player.invuln * 12) % 2 === 0 ? 0.35 : 1;
    ctx.fillStyle = "#7dffe1";
    ctx.beginPath();
    ctx.arc(0, 0, player.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#06221b";
    ctx.beginPath();
    ctx.arc(4, -2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (nearest && state.playing && !state.modal) {
      ctx.strokeStyle = "rgba(125,255,225,0.7)";
      ctx.strokeRect(nearest.x - 20, nearest.y - 22, 40, 34);
    }

    ctx.restore();
    drawMinimap();
    const flashEl = document.getElementById("sectorFlash");
    if (flashEl) flashEl.classList.toggle("is-on", flash > 0);
    if (flash > 0) flash -= 0.05;
  }

  function drawMinimap() {
    if (!miniCtx) return;
    const mw = mini.width;
    const mh = mini.height;
    miniCtx.fillStyle = "#070b12";
    miniCtx.fillRect(0, 0, mw, mh);
    const sx = mw / W;
    const sy = mh / H;
    for (let r = 0; r < H; r += 1) {
      for (let c = 0; c < W; c += 1) {
        const ch = grid[r][c];
        if (ch === "#") miniCtx.fillStyle = "#1c2638";
        else if (ch === "D") miniCtx.fillStyle = "#ffb347";
        else miniCtx.fillStyle = "#101826";
        miniCtx.fillRect(c * sx, r * sy, sx + 0.4, sy + 0.4);
      }
    }
    terminals.forEach((term) => {
      miniCtx.fillStyle = state.nodes[term.id] ? "#7dffe1" : "#4a5568";
      miniCtx.fillRect((term.x / TILE) * sx - 1.5, (term.y / TILE) * sy - 1.5, 3, 3);
    });
    miniCtx.fillStyle = "#ffffff";
    miniCtx.fillRect((player.x / TILE) * sx - 1.5, (player.y / TILE) * sy - 1.5, 3, 3);
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    updatePlayer(dt);
    updateGlitches(dt);
    updateNearest();
    updateCamera();
    const room = document.getElementById("sectorRoom");
    if (room && player && state.playing) room.textContent = t().rooms[roomAt(player.x, player.y)] || t().tag;
    draw();
    requestAnimationFrame(frame);
  }

  function resize() {
    // draw() syncs the bitmap; camera clamp uses client size.
  }

  function boot() {
    const copy = t();
    const root = document.getElementById("sectorBoot");
    const log = document.getElementById("sectorBootLog");
    document.getElementById("sectorBootTitle").textContent = copy.bootTitle;
    document.getElementById("sectorBootText").textContent = copy.bootText;
    document.getElementById("sectorBootBtn").textContent = copy.bootBtn;
    const skip = document.getElementById("sectorBootSkip");
    skip.textContent = copy.skip;
    skip.hidden = !state.bootSeen;

    const start = () => {
      root.hidden = true;
      state.playing = true;
      state.bootSeen = true;
      save();
      renderHud();
      applyDeepLink();
    };
    document.getElementById("sectorBootBtn").addEventListener("click", start);
    skip.addEventListener("click", start);

    if (state.bootSeen) {
      root.hidden = true;
      state.playing = true;
      renderHud();
      applyDeepLink();
      return;
    }
    let i = 0;
    const lines = [];
    const step = () => {
      if (i >= copy.bootLines.length) return;
      lines.push(copy.bootLines[i]);
      log.innerHTML = lines.map((line, idx) => (idx === lines.length - 1 ? '<span class="ok">' + esc(line) + "</span>" : esc(line))).join("\n");
      i += 1;
      if (i < copy.bootLines.length) window.setTimeout(step, 320);
    };
    step();
  }

  function applyDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const spawn = params.get("spawn");
    let zone = params.get("zone");
    if (!zone && spawn) {
      zone = spawn === "contact" ? "comms" : spawn === "projects" ? "field" : spawn === "education" ? "archive" : spawn === "experience" || spawn === "resume" ? "ops" : "hub";
    }
    const map = { career: "ops", experience: "ops", resume: "ops", education: "archive", projects: "field", contact: "comms", hq: "hub" };
    zone = map[zone] || zone;
    const term = terminals.find((item) => item.id === zone);
    if (!term || zone === "vault" && !nodesDone()) return;
    player.x = term.x;
    player.y = term.y + 36;
    camera.x = player.x - canvas.clientWidth / 2;
    camera.y = player.y - canvas.clientHeight / 2;
  }

  function bindInput() {
    window.addEventListener("keydown", (e) => {
      keys[e.code] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
      if (e.key === "Escape") closeModal();
      if ((e.key === "e" || e.key === "E") && nearest && state.playing && !state.modal) useTerminal(nearest);
    });
    window.addEventListener("keyup", (e) => {
      keys[e.code] = false;
    });
    document.getElementById("sectorModalClose").addEventListener("click", closeModal);
    document.getElementById("sectorModal").addEventListener("click", (e) => {
      if (e.target.id === "sectorModal") closeModal();
    });
    document.getElementById("sectorModalBody").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-project]");
      if (!btn) return;
      const id = btn.getAttribute("data-project");
      const proj = data.getProjects().find((item) => item.id === id);
      if (proj) openModal(proj.title, projectDetail(id));
    });
    document.addEventListener("click", (e) => {
      if (e.target.closest("#downloadResumeBtn")) {
        state.won = true;
        save();
        renderHud();
        showToast(t().win);
      }
    });
    window.addEventListener("portfolio:quest", (event) => {
      if (event.detail && event.detail.id === "message") showToast(t().nodes.comms);
    });

    const touch = "ontouchstart" in window;
    if (touch) {
      document.getElementById("sectorStick").classList.add("is-on");
      document.getElementById("sectorUse").classList.add("is-on");
    }
    const stickEl = document.getElementById("sectorStick");
    const knob = document.getElementById("sectorStickKnob");
    const setStick = (clientX, clientY) => {
      const rect = stickEl.getBoundingClientRect();
      const dx = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      stick.x = Math.max(-1, Math.min(1, dx));
      stick.y = Math.max(-1, Math.min(1, dy));
      stick.on = true;
      knob.style.left = 37 + stick.x * 28 + "px";
      knob.style.top = 37 + stick.y * 28 + "px";
    };
    stickEl.addEventListener("touchstart", (e) => {
      e.preventDefault();
      setStick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }, { passive: false });
    stickEl.addEventListener("touchmove", (e) => {
      e.preventDefault();
      setStick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }, { passive: false });
    stickEl.addEventListener("touchend", () => {
      stick.on = false;
      stick.x = 0;
      stick.y = 0;
      knob.style.left = "37px";
      knob.style.top = "37px";
    });
    document.getElementById("sectorUse").addEventListener("click", () => {
      if (nearest) useTerminal(nearest);
    });
  }

  function initChrome() {
    const copy = t();
    document.getElementById("sectorBrand").textContent = copy.title;
    document.getElementById("sectorTag").textContent = copy.tag;
    document.querySelectorAll("[data-lang-toggle] [data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === state.lang));
    });
    document.getElementById("sectorModalClose").setAttribute("aria-label", copy.close);
  }

  function init() {
    if (!document.body.classList.contains("sector-app")) return;
    data = window.PortfolioData;
    if (!data) return;
    state.lang = lang();
    state.base = state.lang === "pt" ? "../" : "";
    loadSave();
    data.renderResume(state.lang);
    canvas = document.getElementById("sectorCanvas");
    ctx = canvas.getContext("2d");
    mini = document.getElementById("sectorMini");
    miniCtx = mini.getContext("2d");
    buildMap();
    initChrome();
    renderHud();
    bindInput();
    boot();
    window.addEventListener("resize", resize);
    requestAnimationFrame(frame);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
