import * as THREE from "three";

const COPY = {
  pt: {
    title: "Portfólio Diogo Pinto",
    subtitle: "Exploração 3D",
    startTitle: "Entra no portfólio",
    startText: "Move-te com WASD ou setas. Olha com o rato. Aproxima-te dos terminais e prime E.",
    startBtn: "Começar exploração",
    move: "WASD · E interagir · Esc libertar rato",
    interact: "Prime E · ",
    close: "Fechar",
    profile: "Perfil",
    experience: "Operações",
    education: "Arquivo",
    projects: "Projetos",
    contact: "Contacto",
    admin: "Acesso",
    export: "Exportar PDF",
    send: "Enviar mensagem",
    about: "Sobre",
    hub: "Núcleo",
    empty: "Sem registos.",
    formName: "Nome",
    formEmail: "Email",
    formMessage: "Mensagem",
    formSubject: "Assunto"
  },
  en: {
    title: "Diogo Pinto Portfolio",
    subtitle: "3D exploration",
    startTitle: "Enter the portfolio",
    startText: "Move with WASD or arrow keys. Look with the mouse. Walk to terminals and press E.",
    startBtn: "Start exploring",
    move: "WASD · E interact · Esc release mouse",
    interact: "Press E · ",
    close: "Close",
    profile: "Profile",
    experience: "Operations",
    education: "Archive",
    projects: "Projects",
    contact: "Contact",
    admin: "Access",
    export: "Export PDF",
    send: "Send message",
    about: "About",
    hub: "Core",
    empty: "No records.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubject: "Subject"
  }
};

const state = {
  lang: "en",
  base: "",
  keys: {},
  yaw: 0,
  pitch: 0,
  velocity: new THREE.Vector3(),
  position: new THREE.Vector3(0, 1.65, 8),
  locked: false,
  panelOpen: false,
  nearest: null,
  touchMove: { x: 0, y: 0, active: false, id: null },
  touchLook: { active: false, lastX: 0, lastY: 0 }
};

let scene;
let camera;
let renderer;
let clock;
let interactables = [];
let colliders = [];
let data;
let ui;

function t() {
  return COPY[state.lang];
}

function txt(obj) {
  return data.getText(obj, state.lang);
}

function initLang() {
  state.lang = /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  state.base = state.lang === "pt" ? "../" : "";
  document.documentElement.lang = state.lang === "pt" ? "pt-PT" : "en-US";
}

function bindUi() {
  const copy = t();
  document.getElementById("worldBrandTitle").textContent = copy.title;
  document.getElementById("worldBrandSub").textContent = copy.subtitle;
  document.getElementById("worldStartTitle").textContent = copy.startTitle;
  document.getElementById("worldStartText").textContent = copy.startText;
  document.getElementById("worldStartBtn").textContent = copy.startBtn;
  document.querySelectorAll("[data-lang-toggle] [data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === state.lang));
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if ((lang !== "en" && lang !== "pt") || lang === state.lang) return;
      try {
        localStorage.setItem("site.lang", lang);
      } catch {}
      window.location.href = lang === "pt" ? (state.lang === "en" ? "pt/index.html" : "index.html") : (state.lang === "pt" ? "../index.html" : "index.html");
    });
  });
  document.getElementById("worldStartBtn").addEventListener("click", startGame);
  document.getElementById("worldPanelClose").addEventListener("click", closePanel);
  document.getElementById("worldTouchAction").addEventListener("click", () => {
    if (state.nearest) openInteract(state.nearest);
  });
}

function startGame() {
  document.getElementById("worldStart").classList.add("is-hidden");
  const canvas = document.getElementById("worldCanvas");
  if (!("ontouchstart" in window)) {
    canvas.requestPointerLock();
  } else {
    document.getElementById("worldTouch").classList.add("is-visible");
    document.getElementById("worldTouchAction").classList.add("is-visible");
  }
  state.locked = true;
}

function addCollider(minX, maxX, minZ, maxZ) {
  colliders.push({ minX, maxX, minZ, maxZ });
}

function blocked(x, z) {
  if (Math.abs(x) > 34 || Math.abs(z) > 34) return true;
  return colliders.some((c) => x > c.minX && x < c.maxX && z > c.minZ && z < c.maxZ);
}

function createTerminal(x, z, color, height = 2.4) {
  const geo = new THREE.BoxGeometry(2.2, height, 1.2);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x0d1220,
    emissive: color,
    emissiveIntensity: 0.35,
    metalness: 0.4,
    roughness: 0.35
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, height / 2, z);
  return mesh;
}

function createZoneLight(x, z, color) {
  const light = new THREE.PointLight(color, 2.2, 18);
  light.position.set(x, 4, z);
  scene.add(light);
}

function addInteract(mesh, payload) {
  mesh.userData.interact = payload;
  interactables.push(mesh);
  scene.add(mesh);
}

function buildWorld() {
  const floorGeo = new THREE.PlaneGeometry(72, 72, 24, 24);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x080b13,
    metalness: 0.2,
    roughness: 0.85
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const grid = new THREE.GridHelper(72, 36, 0x7dffe1, 0x1a2238);
  grid.position.y = 0.02;
  scene.add(grid);

  scene.fog = new THREE.FogExp2(0x05070d, 0.028);
  scene.add(new THREE.AmbientLight(0x6a7cff, 0.35));
  const sun = new THREE.DirectionalLight(0xffffff, 0.55);
  sun.position.set(8, 16, 6);
  scene.add(sun);

  const texLoader = new THREE.TextureLoader();
  const portrait = texLoader.load(state.base + "assets/profile.png");
  portrait.colorSpace = THREE.SRGBColorSpace;
  const portraitMat = new THREE.MeshBasicMaterial({ map: portrait, transparent: true });
  const portraitMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.2), portraitMat);
  portraitMesh.position.set(0, 2.2, -0.05);
  const hub = createTerminal(0, 0, 0x7dffe1, 3.6);
  hub.add(portraitMesh);
  addInteract(hub, { type: "profile" });
  createZoneLight(0, 0, 0x7dffe1);
  addCollider(-2.5, 2.5, -2.5, 2.5);

  const exp = createTerminal(-10, -14, 0x7c87ff, 2.8);
  addInteract(exp, { type: "experience" });
  createZoneLight(-10, -14, 0x7c87ff);

  const edu = createTerminal(10, -14, 0xff4f8b, 2.8);
  addInteract(edu, { type: "education" });
  createZoneLight(10, -14, 0xff4f8b);

  const projects = data.getProjects();
  projects.slice(0, 3).forEach((proj, index) => {
    const x = -12 + index * 12;
    const z = 14;
    const ped = createTerminal(x, z, 0x9aa8ff, 2.2);
    addInteract(ped, { type: "project", id: proj.id });
    createZoneLight(x, z, 0x9aa8ff);
    addCollider(x - 1.4, x + 1.4, z - 1, z + 1);
  });
  addInteract(createTerminal(0, 16, 0x7dffe1, 2.6), { type: "projects" });

  addInteract(createTerminal(0, -16, 0xff4f8b, 2.5), { type: "contact" });
  createZoneLight(0, -16, 0xff4f8b);

  addInteract(createTerminal(14, 2, 0xffffff, 2), { type: "admin" });
  addCollider(12.5, 15.5, 0.5, 3.5);

  const ringGeo = new THREE.TorusGeometry(28, 0.08, 8, 64);
  const ring = new THREE.Mesh(
    ringGeo,
    new THREE.MeshBasicMaterial({ color: 0x7dffe1, transparent: true, opacity: 0.25 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.1;
  scene.add(ring);

  const spawn = new URLSearchParams(window.location.search).get("spawn");
  if (spawn === "contact") state.position.set(0, 1.65, -12);
  if (spawn === "projects") state.position.set(0, 1.65, 12);
  if (spawn === "resume" || spawn === "experience") state.position.set(-8, 1.65, -12);
  if (spawn === "education") state.position.set(8, 1.65, -12);
}

function codeProfile() {
  const landing = data.getLanding();
  const skills = landing.skills || [];
  const lines = ['// operator profile', "const profile = {"];
  lines.push(`  name: "Diogo Pinto",`);
  lines.push(`  base: "${txt(landing.hero?.location) || "PT"}",`);
  skills.forEach((sk, i) => {
    const key = String(sk.num || i + 1).padStart(2, "0");
    lines.push(`  skill_${key}: "${txt(sk.title)}",`);
  });
  lines.push(`  stack: ["TypeScript", "PHP", "Laravel", "SQL", "Spring Boot"]`);
  lines.push("};");
  return lines.join("\n");
}

function openPanel(title, html) {
  state.panelOpen = true;
  document.getElementById("worldPanelTitle").textContent = title;
  document.getElementById("worldPanelBody").innerHTML = html;
  document.getElementById("worldPanel").hidden = false;
  document.exitPointerLock?.();
}

function closePanel() {
  state.panelOpen = false;
  document.getElementById("worldPanel").hidden = true;
}

function openInteract(payload) {
  const copy = t();
  if (payload.type === "profile") {
    const landing = data.getLanding();
    openPanel(
      copy.profile,
      `<div class="world-code">${escapeHtml(codeProfile())}</div>
       <p class="lead">${escapeHtml(txt(landing.about?.p1))}</p>
       <p class="lead">${escapeHtml(txt(landing.about?.p2))}</p>`
    );
    return;
  }
  if (payload.type === "experience") {
    const jobs = data.getExperiences().filter((e) => e.type !== "internship");
    openPanel(
      copy.experience,
      renderRecordList(jobs, (item) => `<strong>${escapeHtml(txt(item.role))}</strong><span>${escapeHtml(item.company)} · ${escapeHtml(txt(item.period))}</span>`)
    );
    return;
  }
  if (payload.type === "education") {
    openPanel(copy.education, renderRecordList(data.getEducation(), (item) =>
      `<strong>${escapeHtml(txt(item.degree))}</strong><span>${escapeHtml(txt(item.institution))}</span>`));
    return;
  }
  if (payload.type === "projects") {
    openPanel(copy.projects, renderRecordList(data.getProjects(), (item) =>
      `<strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(txt(item.description)).slice(0, 90)}...</span>`));
    return;
  }
  if (payload.type === "project") {
    const proj = data.getProjects().find((p) => p.id === payload.id);
    if (!proj) return;
    const href = proj.link ? (proj.link.startsWith("http") ? proj.link : state.base + proj.link) : "";
    openPanel(
      proj.title,
      `<p>${escapeHtml(txt(proj.description))}</p>
       ${href ? `<a class="btn-solid" href="${escapeHtml(href)}" target="_blank" rel="noopener">Open</a>` : ""}`
    );
    return;
  }
  if (payload.type === "contact") {
    openPanel(
      copy.contact,
      `<form id="contactForm" class="contact-form">
        <input class="hp-field" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <label>${copy.formName}<input name="name" required /></label>
        <label>${copy.formEmail}<input type="email" name="email" required /></label>
        <label>${copy.formSubject}<input name="subject" /></label>
        <label>${copy.formMessage}<textarea name="message" required></textarea></label>
        <button class="btn-solid" type="submit">${copy.send}</button>
        <p id="contactStatus" class="form-status"></p>
      </form>`
    );
    if (window.bindContactFormRetry) window.bindContactFormRetry();
    return;
  }
  if (payload.type === "admin") {
    window.location.href = state.base + "admin.html";
  }
}

function renderRecordList(items, renderItem) {
  const copy = t();
  if (!items.length) return `<p>${copy.empty}</p>`;
  return `<div class="world-list">${items.map((item) =>
    `<div class="world-card">${renderItem(item)}</div>`).join("")}</div>
    <p style="margin-top:1rem"><button type="button" class="btn-ghost" id="downloadResumeBtn">${copy.export}</button></p>`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function updateNearest() {
  let best = null;
  let bestDist = Infinity;
  interactables.forEach((mesh) => {
    const d = mesh.position.distanceTo(state.position);
    if (d < bestDist) {
      bestDist = d;
      best = mesh.userData.interact;
    }
  });
  state.nearest = bestDist < 4.2 ? best : null;
  const hint = document.getElementById("worldHint");
  if (!hint) return;
  if (state.panelOpen) {
    hint.textContent = t().close + " · Esc";
    return;
  }
  if (state.nearest) {
    hint.textContent = t().interact + labelFor(state.nearest);
  } else {
    hint.textContent = t().move;
  }
}

function labelFor(payload) {
  const copy = t();
  if (payload.type === "profile") return copy.hub;
  if (payload.type === "experience") return copy.experience;
  if (payload.type === "education") return copy.education;
  if (payload.type === "projects") return copy.projects;
  if (payload.type === "project") {
    const p = data.getProjects().find((x) => x.id === payload.id);
    return p ? p.title : copy.projects;
  }
  if (payload.type === "contact") return copy.contact;
  if (payload.type === "admin") return copy.admin;
  return copy.hub;
}

function updateMovement(dt) {
  if (state.panelOpen) return;
  const forward = new THREE.Vector3(Math.sin(state.yaw), 0, Math.cos(state.yaw)).multiplyScalar(-1);
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
  const move = new THREE.Vector3();
  if (state.keys.w || state.keys.ArrowUp) move.add(forward);
  if (state.keys.s || state.keys.ArrowDown) move.sub(forward);
  if (state.keys.a || state.keys.ArrowLeft) move.sub(right);
  if (state.keys.d || state.keys.ArrowRight) move.add(right);
  if (state.touchMove.active) {
    move.add(forward.clone().multiplyScalar(-state.touchMove.y));
    move.add(right.clone().multiplyScalar(state.touchMove.x));
  }
  if (move.lengthSq() > 0) {
    move.normalize().multiplyScalar((state.keys.shift ? 10 : 6.5) * dt);
    const nextX = state.position.x + move.x;
    const nextZ = state.position.z + move.z;
    if (!blocked(nextX, state.position.z)) state.position.x = nextX;
    if (!blocked(state.position.x, nextZ)) state.position.z = nextZ;
  }
  camera.position.copy(state.position);
  camera.rotation.order = "YXZ";
  camera.rotation.y = state.yaw;
  camera.rotation.x = state.pitch;
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  updateMovement(dt);
  updateNearest();
  renderer.render(scene, camera);
}

function bindInput() {
  const canvas = document.getElementById("worldCanvas");
  window.addEventListener("keydown", (e) => {
    state.keys[e.key] = true;
    if (e.key === "Escape") {
      if (state.panelOpen) closePanel();
      else document.exitPointerLock?.();
    }
    if ((e.key === "e" || e.key === "E") && state.nearest && !state.panelOpen) {
      openInteract(state.nearest);
    }
  });
  window.addEventListener("keyup", (e) => {
    state.keys[e.key] = false;
  });
  document.addEventListener("pointerlockchange", () => {
    state.locked = document.pointerLockElement === canvas;
  });
  canvas.addEventListener("click", () => {
    if (!state.panelOpen && !("ontouchstart" in window)) canvas.requestPointerLock();
  });
  document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement !== canvas) return;
    state.yaw -= e.movementX * 0.0022;
    state.pitch -= e.movementY * 0.0022;
    state.pitch = Math.max(-1.1, Math.min(1.1, state.pitch));
  });

  const touchZone = document.getElementById("worldTouch");
  const knob = document.getElementById("worldTouchKnob");
  touchZone.addEventListener("touchstart", (e) => {
    e.preventDefault();
    state.touchMove.active = true;
    state.touchMove.id = e.changedTouches[0].identifier;
  }, { passive: false });
  touchZone.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touch = [...e.changedTouches].find((t) => t.identifier === state.touchMove.id);
    if (!touch) return;
    const rect = touchZone.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (touch.clientX - cx) / (rect.width / 2);
    const dy = (touch.clientY - cy) / (rect.height / 2);
    state.touchMove.x = Math.max(-1, Math.min(1, dx));
    state.touchMove.y = Math.max(-1, Math.min(1, dy));
    knob.style.left = `${38 + state.touchMove.x * 28}px`;
    knob.style.top = `${38 + state.touchMove.y * 28}px`;
  }, { passive: false });
  touchZone.addEventListener("touchend", () => {
    state.touchMove.active = false;
    state.touchMove.x = 0;
    state.touchMove.y = 0;
    knob.style.left = "38px";
    knob.style.top = "38px";
  });

  canvas.addEventListener("touchstart", (e) => {
    if (e.target !== canvas) return;
    state.touchLook.active = true;
    state.touchLook.lastX = e.changedTouches[0].clientX;
    state.touchLook.lastY = e.changedTouches[0].clientY;
  }, { passive: true });
  canvas.addEventListener("touchmove", (e) => {
    if (!state.touchLook.active) return;
    const touch = e.changedTouches[0];
    state.yaw -= (touch.clientX - state.touchLook.lastX) * 0.004;
    state.pitch -= (touch.clientY - state.touchLook.lastY) * 0.004;
    state.pitch = Math.max(-1.1, Math.min(1.1, state.pitch));
    state.touchLook.lastX = touch.clientX;
    state.touchLook.lastY = touch.clientY;
  }, { passive: true });
}

function init() {
  data = window.PortfolioData;
  if (!data) return;
  initLang();
  bindUi();
  data.renderResume(state.lang);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 120);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("worldCanvas"), antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  clock = new THREE.Clock();

  buildWorld();
  bindInput();
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

document.addEventListener("DOMContentLoaded", init);
