(function () {
  const SESSION_KEY = "portfolio.admin";
  const state = {
    view: "profile",
    selectedId: "",
    mode: "",
    error: ""
  };

  const COPY = {
    pt: {
      live: "Ficha ativa",
      profile: "Perfil",
      ops: "Operações",
      archive: "Arquivo",
      export: "Exportar ficha",
      access: "Acesso",
      session: "Sessão ativa",
      close: "Fechar",
      password: "Palavra-passe",
      enter: "Entrar",
      logout: "Terminar sessão",
      badPassword: "Palavra-passe incorreta.",
      accessLead: "O acesso destranca a edição da experiência e da formação.",
      addOp: "Nova operação",
      addEdu: "Novo registo",
      edit: "Editar",
      remove: "Apagar",
      save: "Guardar",
      cancel: "Cancelar",
      confirmDelete: "Apagar este registo?",
      empty: "Ainda não há registos.",
      role: "Função",
      company: "Organização",
      shortName: "Nome curto",
      period: "Período",
      detail: "Detalhe",
      brief: "Briefing",
      tags: "Etiquetas, separadas por vírgulas",
      url: "Ligação",
      type: "Tipo",
      job: "Trabalho",
      internship: "Estágio",
      degree: "Curso",
      institution: "Instituição",
      level: "Nível",
      area: "Área",
      location: "Local",
      notes: "Notas",
      required: "Preenche a função e a organização.",
      requiredEdu: "Preenche o curso.",
      ptCol: "Português",
      enCol: "English",
      comment: "// ficha de operador, gerada a partir do perfil",
      available: "disponível",
      opsLead: "Cada experiência é um registo que podes abrir.",
      archiveLead: "Formação e percurso académico."
    },
    en: {
      live: "Live file",
      profile: "Profile",
      ops: "Operations",
      archive: "Archive",
      export: "Export file",
      access: "Access",
      session: "Session active",
      close: "Close",
      password: "Password",
      enter: "Enter",
      logout: "Sign out",
      badPassword: "Incorrect password.",
      accessLead: "Access unlocks editing for experience and education.",
      addOp: "New operation",
      addEdu: "New record",
      edit: "Edit",
      remove: "Delete",
      save: "Save",
      cancel: "Cancel",
      confirmDelete: "Delete this record?",
      empty: "No records yet.",
      role: "Role",
      company: "Organization",
      shortName: "Short name",
      period: "Period",
      detail: "Detail",
      brief: "Brief",
      tags: "Tags, separated by commas",
      url: "Link",
      type: "Type",
      job: "Job",
      internship: "Internship",
      degree: "Degree",
      institution: "Institution",
      level: "Level",
      area: "Area",
      location: "Location",
      notes: "Notes",
      required: "Fill in the role and the organization.",
      requiredEdu: "Fill in the degree.",
      ptCol: "Português",
      enCol: "English",
      comment: "// operator file, built from the profile",
      available: "available",
      opsLead: "Each experience is a record you can open.",
      archiveLead: "Education and academic path."
    }
  };

  function lang() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  }

  function t() {
    return COPY[lang()];
  }

  function data() {
    return window.PortfolioData;
  }

  function assetBase() {
    return /\/pt(?:\/|$)/.test(window.location.pathname) ? "../" : "";
  }

  function authed() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }

  function esc(value) {
    return data().escapeHtml(value);
  }

  function text(obj) {
    return data().getText(obj, lang());
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function experiences() {
    return data().getExperiences();
  }

  function education() {
    return data().getEducation();
  }

  function selectedExperience() {
    return experiences().find((item) => item.id === state.selectedId) || experiences()[0] || null;
  }

  function selectedEducation() {
    return education().find((item) => item.id === state.selectedId) || education()[0] || null;
  }

  function stackList() {
    return ["TypeScript", "JavaScript", "PHP", "Laravel", "SQL", "Spring Boot"];
  }

  function codeLines() {
    const copy = t();
    const landing = data().getLanding();
    const skills = landing.skills || [];
    const location = text(landing.hero && landing.hero.location) || "Santa Maria da Feira · PT";
    const lines = [
      { kind: "comment", text: copy.comment },
      { kind: "plain", text: "const profile = {" },
      { kind: "prop", key: "name", value: "Diogo Pinto" },
      { kind: "prop", key: "base", value: location },
      { kind: "prop", key: "status", value: copy.available },
      { kind: "plain", text: "  skills: {" }
    ];
    skills.forEach((skill, index) => {
      const key = String(skill.num || index + 1).padStart(2, "0") + "_" + slug(text(skill.title) || "skill");
      lines.push({ kind: "prop", key: key, value: text(skill.desc), indent: 2 });
    });
    lines.push({ kind: "plain", text: "  }," });
    lines.push({ kind: "array", key: "stack", values: stackList() });
    lines.push({ kind: "plain", text: "};" });
    return lines;
  }

  function slug(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "") || "skill";
  }

  function renderCode(lines) {
    return lines.map((line, index) => {
      let body = "";
      if (line.kind === "comment") body = '<span class="tok-comment">' + esc(line.text) + "</span>";
      if (line.kind === "plain") body = esc(line.text);
      if (line.kind === "prop") {
        const pad = line.indent === 2 ? "    " : "  ";
        body = pad + '<span class="tok-key">' + esc(line.key) + '</span>: <span class="tok-string">"' + esc(line.value) + '"</span>,';
      }
      if (line.kind === "array") {
        const values = (line.values || []).map((value) => '<span class="tok-string">"' + esc(value) + '"</span>').join(", ");
        body = '  <span class="tok-key">' + esc(line.key) + "</span>: [" + values + "]";
      }
      return '<div class="code-line"><span>' + (index + 1) + "</span><code>" + body + "</code></div>";
    }).join("");
  }

  function renderList(items, kind) {
    const copy = t();
    if (!items.length) return '<p class="profiler-empty">' + esc(copy.empty) + "</p>";
    return '<div class="profiler-list">' + items.map((item, index) => {
      const active = item.id === state.selectedId || (!state.selectedId && index === 0);
      const title = kind === "ops" ? (item.companyShort || item.company) : text(item.degree);
      const meta = kind === "ops" ? text(item.role) : text(item.institution);
      return '<button type="button" class="profiler-record' + (active ? " is-active" : "") + '" data-select="' + esc(item.id) + '">' +
        "<em>" + String(index + 1).padStart(2, "0") + "</em>" +
        "<strong>" + esc(title) + "</strong>" +
        "<span>" + esc(meta) + "</span>" +
        "</button>";
    }).join("") + "</div>";
  }

  function renderDossier(kind) {
    const copy = t();
    const item = kind === "ops" ? selectedExperience() : selectedEducation();
    if (!item) return "";
    const tools = authed()
      ? '<div class="profiler-tools"><button type="button" data-edit="' + esc(item.id) + '">' + esc(copy.edit) + '</button><button type="button" data-delete="' + esc(item.id) + '">' + esc(copy.remove) + "</button></div>"
      : "";
    if (kind === "ops") {
      const tags = (item.tags || []).map((tag) => "<span>" + esc(tag) + "</span>").join("");
      const link = item.url ? '<a href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">' + esc(item.url.replace(/^https?:\/\//, "")) + "</a>" : "";
      return '<article class="profiler-dossier">' + tools +
        '<p class="profiler-kicker">' + esc(item.type === "internship" ? copy.internship : copy.job) + "</p>" +
        "<h2>" + esc(text(item.role)) + "</h2>" +
        "<p>" + esc(item.company) + "</p>" +
        '<p class="profiler-meta">' + esc(text(item.period)) + (text(item.sub) ? " · " + esc(text(item.sub)) : "") + "</p>" +
        "<p>" + esc(text(item.description)).replace(/\n/g, "<br>") + "</p>" +
        (link ? "<p>" + link + "</p>" : "") +
        (tags ? '<div class="profiler-tags">' + tags + "</div>" : "") +
        "</article>";
    }
    return '<article class="profiler-dossier">' + tools +
      '<p class="profiler-kicker">' + esc(text(item.level) || copy.archive) + "</p>" +
      "<h2>" + esc(text(item.degree)) + "</h2>" +
      "<p>" + esc(text(item.institution)) + "</p>" +
      '<p class="profiler-meta">' + esc(text(item.period)) + (text(item.location) ? " · " + esc(text(item.location)) : "") + "</p>" +
      "<p>" + esc(text(item.description)).replace(/\n/g, "<br>") + "</p>" +
      (text(item.keyDetails) ? '<p class="profiler-meta">' + esc(text(item.keyDetails)).replace(/\n/g, "<br>") + "</p>" : "") +
      "</article>";
  }

  function field(name, label, value, area) {
    const control = area
      ? '<textarea name="' + name + '" rows="4">' + esc(value) + "</textarea>"
      : '<input name="' + name + '" value="' + esc(value) + '" />';
    return "<label>" + esc(label) + control + "</label>";
  }

  function pair(name, label, obj, area) {
    const copy = t();
    return '<div class="profiler-pair"><p>' + esc(label) + "</p>" +
      field(name + "Pt", copy.ptCol, obj && obj.pt || "", area) +
      field(name + "En", copy.enCol, obj && obj.en || "", area) +
      "</div>";
  }

  function renderEditor() {
    if (!state.mode || !authed()) return "";
    const copy = t();
    const editing = state.mode === "edit";
    if (state.view === "ops") {
      const current = editing ? experiences().find((item) => item.id === state.selectedId) : null;
      const item = current || {
        type: "job", company: "", companyShort: "", url: "", tags: [],
        role: {}, period: {}, sub: {}, description: {}
      };
      return '<form id="profilerEditor" class="profiler-editor">' +
        "<h2>" + esc(editing ? copy.edit : copy.addOp) + "</h2>" +
        '<label>' + esc(copy.type) + '<select name="type"><option value="job"' + (item.type !== "internship" ? " selected" : "") + ">" + esc(copy.job) + '</option><option value="internship"' + (item.type === "internship" ? " selected" : "") + ">" + esc(copy.internship) + "</option></select></label>" +
        field("company", copy.company, item.company) +
        field("companyShort", copy.shortName, item.companyShort) +
        field("url", copy.url, item.url) +
        field("tags", copy.tags, (item.tags || []).join(", ")) +
        pair("role", copy.role, item.role) +
        pair("period", copy.period, item.period) +
        pair("sub", copy.detail, item.sub) +
        pair("description", copy.brief, item.description, true) +
        (state.error ? '<p class="form-status is-error">' + esc(state.error) + "</p>" : "") +
        '<div class="profiler-tools"><button class="is-solid" type="submit">' + esc(copy.save) + '</button><button type="button" data-close-editor>' + esc(copy.cancel) + "</button></div>" +
        "</form>";
    }
    const current = editing ? education().find((item) => item.id === state.selectedId) : null;
    const item = current || { degree: {}, institution: {}, level: {}, area: {}, period: {}, location: {}, description: {}, keyDetails: {} };
    return '<form id="profilerEditor" class="profiler-editor">' +
      "<h2>" + esc(editing ? copy.edit : copy.addEdu) + "</h2>" +
      pair("degree", copy.degree, item.degree) +
      pair("institution", copy.institution, item.institution) +
      pair("level", copy.level, item.level) +
      pair("area", copy.area, item.area) +
      pair("period", copy.period, item.period) +
      pair("location", copy.location, item.location) +
      pair("description", copy.brief, item.description, true) +
      pair("keyDetails", copy.notes, item.keyDetails, true) +
      (state.error ? '<p class="form-status is-error">' + esc(state.error) + "</p>" : "") +
      '<div class="profiler-tools"><button class="is-solid" type="submit">' + esc(copy.save) + '</button><button type="button" data-close-editor>' + esc(copy.cancel) + "</button></div>" +
      "</form>";
  }

  function renderAccess() {
    if (state.mode !== "access") return "";
    const copy = t();
    return '<form id="profilerAccessForm" class="profiler-editor profiler-access">' +
      "<h2>" + esc(copy.access) + "</h2>" +
      "<p>" + esc(copy.accessLead) + "</p>" +
      '<label>' + esc(copy.password) + '<input type="password" name="password" autocomplete="current-password" required /></label>' +
      (state.error ? '<p class="form-status is-error">' + esc(state.error) + "</p>" : "") +
      '<div class="profiler-tools"><button class="is-solid" type="submit">' + esc(copy.enter) + '</button><button type="button" data-close-editor>' + esc(copy.cancel) + "</button></div>" +
      "</form>";
  }

  function renderStage() {
    const copy = t();
    if (state.view === "profile") {
      return '<div class="profiler-code" aria-label="profile">' + renderCode(codeLines()) + "</div>";
    }
    const kind = state.view === "archive" ? "archive" : "ops";
    const items = kind === "ops" ? experiences() : education();
    const add = authed()
      ? '<button type="button" class="profiler-add" data-add="' + kind + '">' + esc(kind === "ops" ? copy.addOp : copy.addEdu) + "</button>"
      : "";
    return '<div class="profiler-split">' +
      "<div><p class=\"profiler-kicker\">" + esc(kind === "ops" ? copy.opsLead : copy.archiveLead) + "</p>" + add + renderList(items, kind) + "</div>" +
      renderDossier(kind) +
      "</div>";
  }

  function render() {
    const root = document.getElementById("profiler");
    if (!root || !data()) return;
    const copy = t();
    const landing = data().getLanding();
    const role = text((landing.skills && landing.skills[0] && landing.skills[0].title) || { pt: "Full Stack Web", en: "Full Stack Web" });
    root.innerHTML =
      '<section class="profiler">' +
        '<header class="profiler-top">' +
          "<div><p>" + esc(copy.live) + "</p><h1>Diogo Pinto</h1></div>" +
          '<div class="profiler-actions">' +
            '<a id="downloadResumeBtn" href="#">' + esc(copy.export) + "</a>" +
            (authed()
              ? '<button type="button" data-logout>' + esc(copy.logout) + "</button>"
              : '<button type="button" data-access>' + esc(copy.access) + "</button>") +
          "</div>" +
        "</header>" +
        '<div class="profiler-shell">' +
          '<aside class="profiler-side">' +
            '<div class="profiler-portrait"><img src="' + assetBase() + 'assets/profile.png" alt="Diogo Pinto" /></div>' +
            "<strong>Diogo Pinto</strong>" +
            "<span>" + esc(role) + "</span>" +
            '<nav class="profiler-nav">' +
              navButton("profile", copy.profile) +
              navButton("ops", copy.ops) +
              navButton("archive", copy.archive) +
            "</nav>" +
          "</aside>" +
          '<div class="profiler-stage">' + renderStage() + renderEditor() + renderAccess() + "</div>" +
        "</div>" +
      "</section>";
  }

  function navButton(view, label) {
    return '<button type="button" data-view="' + view + '"' + (state.view === view ? ' class="is-active"' : "") + ">" + esc(label) + "</button>";
  }

  function ensureSelection() {
    if (state.view === "ops" && !experiences().some((item) => item.id === state.selectedId)) {
      state.selectedId = (experiences()[0] && experiences()[0].id) || "";
    }
    if (state.view === "archive" && !education().some((item) => item.id === state.selectedId)) {
      state.selectedId = (education()[0] && education()[0].id) || "";
    }
  }

  function readPair(form, name) {
    return {
      pt: String(form.elements.namedItem(name + "Pt")?.value || "").trim(),
      en: String(form.elements.namedItem(name + "En")?.value || "").trim()
    };
  }

  function saveExperience(form) {
    const copy = t();
    const company = String(form.elements.namedItem("company")?.value || "").trim();
    const role = readPair(form, "role");
    if (!company || !role.pt) {
      state.error = copy.required;
      render();
      return;
    }
    const period = readPair(form, "period");
    const next = {
      id: state.mode === "edit" ? state.selectedId : "exp-" + Date.now(),
      company: company,
      companyShort: String(form.elements.namedItem("companyShort")?.value || "").trim() || company,
      type: form.elements.namedItem("type")?.value === "internship" ? "internship" : "job",
      role: role,
      period: period,
      periodCv: period,
      sub: readPair(form, "sub"),
      description: readPair(form, "description"),
      tags: String(form.elements.namedItem("tags")?.value || "").split(",").map((tag) => tag.trim()).filter(Boolean),
      url: String(form.elements.namedItem("url")?.value || "").trim()
    };
    const items = experiences().slice();
    const index = items.findIndex((item) => item.id === next.id);
    if (index >= 0) items[index] = next;
    else items.unshift(next);
    data().saveExperiences(items);
    state.selectedId = next.id;
    state.mode = "";
    state.error = "";
    data().renderResume(lang());
    render();
  }

  function saveEducation(form) {
    const copy = t();
    const degree = readPair(form, "degree");
    if (!degree.pt) {
      state.error = copy.requiredEdu;
      render();
      return;
    }
    const period = readPair(form, "period");
    const next = {
      id: state.mode === "edit" ? state.selectedId : "edu-" + Date.now(),
      degree: degree,
      institution: readPair(form, "institution"),
      level: readPair(form, "level"),
      area: readPair(form, "area"),
      period: period,
      periodCv: period,
      location: readPair(form, "location"),
      description: readPair(form, "description"),
      keyDetails: readPair(form, "keyDetails")
    };
    const items = education().slice();
    const index = items.findIndex((item) => item.id === next.id);
    if (index >= 0) items[index] = next;
    else items.unshift(next);
    data().saveEducation(items);
    state.selectedId = next.id;
    state.mode = "";
    state.error = "";
    data().renderResume(lang());
    render();
  }

  async function tryLogin(form) {
    const value = String(form.elements.namedItem("password")?.value || "").trim();
    let hash = "";
    try {
      hash = await sha256(value);
    } catch {}
    const expected = localStorage.getItem("portfolio.admin_hash") || (window.PortfolioAdmin && window.PortfolioAdmin.PASSWORD_HASH);
    const fallback = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";
    const defaultHash = window.PortfolioAdmin && window.PortfolioAdmin.PASSWORD_HASH;
    const valid = value === "admin123" || (hash && (hash === expected || hash === defaultHash || hash === fallback));
    if (!valid) {
      state.error = t().badPassword;
      render();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    state.mode = "";
    state.error = "";
    render();
    if (data().injectAdminControls) data().injectAdminControls();
  }

  function onClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const view = target.closest("[data-view]");
    if (view) {
      state.view = view.getAttribute("data-view");
      state.mode = "";
      state.error = "";
      state.selectedId = "";
      ensureSelection();
      render();
      return;
    }
    const select = target.closest("[data-select]");
    if (select) {
      state.selectedId = select.getAttribute("data-select");
      state.mode = "";
      render();
      return;
    }
    if (target.closest("[data-access]")) {
      state.mode = "access";
      state.error = "";
      render();
      return;
    }
    if (target.closest("[data-logout]")) {
      sessionStorage.removeItem(SESSION_KEY);
      state.mode = "";
      render();
      const badge = document.getElementById("adminBarBadge");
      if (badge) badge.remove();
      return;
    }
    if (target.closest("[data-close-editor]")) {
      state.mode = "";
      state.error = "";
      render();
      return;
    }
    const add = target.closest("[data-add]");
    if (add) {
      state.mode = "add";
      state.error = "";
      render();
      return;
    }
    const edit = target.closest("[data-edit]");
    if (edit) {
      state.selectedId = edit.getAttribute("data-edit");
      state.mode = "edit";
      state.error = "";
      render();
      return;
    }
    const remove = target.closest("[data-delete]");
    if (remove) {
      if (!window.confirm(t().confirmDelete)) return;
      const id = remove.getAttribute("data-delete");
      if (state.view === "archive") data().saveEducation(education().filter((item) => item.id !== id));
      else data().saveExperiences(experiences().filter((item) => item.id !== id));
      state.selectedId = "";
      state.mode = "";
      ensureSelection();
      data().renderResume(lang());
      render();
    }
  }

  function onSubmit(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.id === "profilerAccessForm") {
      event.preventDefault();
      tryLogin(form);
    }
    if (form.id === "profilerEditor") {
      event.preventDefault();
      if (state.view === "archive") saveEducation(form);
      else saveExperience(form);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("profiler");
    if (!root || !data()) return;
    if (!document.getElementById("profilerFont")) {
      const link = document.createElement("link");
      link.id = "profilerFont";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap";
      document.head.appendChild(link);
    }
    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit);
    ensureSelection();
    render();
  });
})();
