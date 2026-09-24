(function () {
  const SESSION_KEY = "portfolio.admin";
  let activeTab = window.location.hash.replace("#", "") || "experience";

  const copy = {
    pt: {
      title: "Área reservada",
      subtitle: "Gestão completa de currículo, projetos e mensagens.",
      lead: "Faça a gestão da experiência profissional, formação académica, projetos e veja contactos recebidos.",
      password: "Palavra-passe",
      enter: "Entrar",
      logout: "Sair",
      tabMessages: "Mensagens",
      tabExperience: "Experiência",
      tabEducation: "Educação",
      tabProjects: "Projetos",
      tabBackup: "Dados & Backup",
      addExperience: "+ Nova Experiência",
      addEducation: "+ Nova Formação",
      addProject: "+ Novo Projeto",
      emptyMessages: "Ainda não há mensagens guardadas neste dispositivo.",
      emptyItems: "Nenhum item adicionado ainda.",
      unread: "por ler",
      mark: "Marcar como lida",
      remove: "Apagar",
      edit: "Editar",
      moveUp: "Subir",
      moveDown: "Descer",
      error: "Palavra-passe incorreta.",
      viewSite: "Ver Início",
      viewResume: "Ver Currículo",
      viewProjects: "Ver Projetos",
      save: "Guardar",
      cancel: "Cancelar",
      savedSuccess: "Guardado com sucesso!",
      deletedSuccess: "Item removido.",
      confirmDelete: "Tem a certeza que deseja apagar este item?",
      exportJson: "Exportar JSON",
      importJson: "Importar JSON",
      resetDefaults: "Repor Dados Originais",
      confirmReset: "Tem a certeza que deseja repor todos os dados originais? Quaisquer alterações locais serão substituídas.",
      copyJson: "Copiar JSON",
      copied: "Copiado!",
      job: "Emprego / Trabalho",
      internship: "Estágio"
    },
    en: {
      title: "Private area",
      subtitle: "Full management of resume, projects, and messages.",
      lead: "Manage work experience, education, projects, and review incoming contacts.",
      password: "Password",
      enter: "Sign in",
      logout: "Sign out",
      tabMessages: "Messages",
      tabExperience: "Experience",
      tabEducation: "Education",
      tabProjects: "Projects",
      tabBackup: "Data & Backup",
      addExperience: "+ Add Experience",
      addEducation: "+ Add Education",
      addProject: "+ Add Project",
      emptyMessages: "No messages are stored on this device yet.",
      emptyItems: "No items added yet.",
      unread: "unread",
      mark: "Mark as read",
      remove: "Delete",
      edit: "Edit",
      moveUp: "Move Up",
      moveDown: "Move Down",
      error: "Incorrect password.",
      viewSite: "View Home",
      viewResume: "View Resume",
      viewProjects: "View Projects",
      save: "Save",
      cancel: "Cancel",
      savedSuccess: "Saved successfully!",
      deletedSuccess: "Item removed.",
      confirmDelete: "Are you sure you want to delete this item?",
      exportJson: "Export JSON",
      importJson: "Import JSON",
      resetDefaults: "Reset to Defaults",
      confirmReset: "Are you sure you want to reset all data to default? Any local custom changes will be overwritten.",
      copyJson: "Copy JSON",
      copied: "Copied!",
      job: "Job / Work",
      internship: "Internship"
    }
  };

  async function sha256(value) {
    const data = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function lang() {
    try {
      return localStorage.getItem("site.lang") === "en" ? "en" : "pt";
    } catch {
      return "pt";
    }
  }

  function t() {
    return copy[lang()];
  }

  function isAuthed() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }

  function showToast(msg) {
    let toast = document.getElementById("adminToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "adminToast";
      toast.className = "admin-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render() {
    const root = document.getElementById("adminApp");
    if (!root || !window.PortfolioAdmin || !window.PortfolioData) return;
    const text = t();
    document.title = text.title + " · Diogo Pinto";

    if (!isAuthed()) {
      root.innerHTML = `
        <div class="admin-card">
          <h1 class="page-title">${text.title}</h1>
          <p class="lead">${text.lead}</p>
          <form id="adminLogin" class="contact-form">
            <label>${text.password}
              <input type="password" name="password" autocomplete="current-password" required placeholder="••••••••">
            </label>
            <button class="btn-solid" type="submit">${text.enter}</button>
            <p id="adminError" class="form-status"></p>
          </form>
        </div>`;

      document.getElementById("adminLogin").addEventListener("submit", async (e) => {
        e.preventDefault();
        const value = e.target.password.value;
        const hash = await sha256(value);
        if (hash !== window.PortfolioAdmin.PASSWORD_HASH) {
          const err = document.getElementById("adminError");
          err.className = "form-status is-error";
          err.textContent = text.error;
          return;
        }
        sessionStorage.setItem(SESSION_KEY, "1");
        render();
      });
      return;
    }

    const messages = window.PortfolioAdmin.readMessages();
    const unreadCount = messages.filter((m) => !m.read).length;
    const experiences = window.PortfolioData.getExperiences();
    const education = window.PortfolioData.getEducation();
    const projects = window.PortfolioData.getProjects();

    const allowedTabs = ["experience", "education", "projects", "messages", "backup"];
    if (!allowedTabs.includes(activeTab)) activeTab = "experience";

    const isPt = lang() === "pt";
    const resumeUrl = isPt ? "pt/resume.html" : "resume.html";
    const projectsUrl = isPt ? "pt/projects.html" : "projects.html";
    const homeUrl = isPt ? "pt/index.html" : "index.html";

    root.innerHTML = `
      <div class="admin-dashboard">
        <header class="admin-dash-header">
          <div>
            <div class="hero-badge"><i class="bi bi-shield-check"></i> ${text.title}</div>
            <h1 class="admin-title">${text.title}</h1>
            <p class="admin-subtitle">${text.subtitle}</p>
          </div>
          <div class="admin-header-actions">
            <a class="btn-ghost" href="${homeUrl}" target="_blank"><i class="bi bi-box-arrow-up-right"></i> ${text.viewSite}</a>
            <a class="btn-ghost" href="${resumeUrl}" target="_blank"><i class="bi bi-file-earmark-person"></i> ${text.viewResume}</a>
            <a class="btn-ghost" href="${projectsUrl}" target="_blank"><i class="bi bi-grid"></i> ${text.viewProjects}</a>
            <button class="btn-solid btn-danger-outline" id="adminLogout" type="button"><i class="bi bi-box-arrow-right"></i> ${text.logout}</button>
          </div>
        </header>

        <!-- Navigation Tabs -->
        <nav class="admin-tabs" role="tablist">
          <button class="admin-tab ${activeTab === 'experience' ? 'is-active' : ''}" data-tab="experience" type="button">
            <i class="bi bi-briefcase"></i> ${text.tabExperience} <span class="tab-count">${experiences.length}</span>
          </button>
          <button class="admin-tab ${activeTab === 'education' ? 'is-active' : ''}" data-tab="education" type="button">
            <i class="bi bi-mortarboard"></i> ${text.tabEducation} <span class="tab-count">${education.length}</span>
          </button>
          <button class="admin-tab ${activeTab === 'projects' ? 'is-active' : ''}" data-tab="projects" type="button">
            <i class="bi bi-code-square"></i> ${text.tabProjects} <span class="tab-count">${projects.length}</span>
          </button>
          <button class="admin-tab ${activeTab === 'messages' ? 'is-active' : ''}" data-tab="messages" type="button">
            <i class="bi bi-envelope"></i> ${text.tabMessages} ${unreadCount > 0 ? `<span class="tab-count is-unread">${unreadCount}</span>` : `<span class="tab-count">${messages.length}</span>`}
          </button>
          <button class="admin-tab ${activeTab === 'backup' ? 'is-active' : ''}" data-tab="backup" type="button">
            <i class="bi bi-sliders"></i> ${text.tabBackup}
          </button>
        </nav>

        <!-- Tab Contents -->
        <main class="admin-tab-content">
          <div id="tabPanelArea"></div>
        </main>
      </div>

      <!-- Modal Container -->
      <div id="adminModalOverlay" class="admin-modal-overlay" style="display:none;">
        <div class="admin-modal" id="adminModalBox"></div>
      </div>
    `;

    document.getElementById("adminLogout").addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      render();
    });

    root.querySelectorAll(".admin-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeTab = btn.getAttribute("data-tab");
        window.location.hash = activeTab;
        render();
      });
    });

    renderCurrentTab();
  }

  function renderCurrentTab() {
    const panel = document.getElementById("tabPanelArea");
    if (!panel) return;
    const text = t();
    const l = lang();

    if (activeTab === "experience") {
      const items = window.PortfolioData.getExperiences();
      panel.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h2>${text.tabExperience} (${items.length})</h2>
            <p class="text-muted">Adicione ou edite experiências profissionais e estágios.</p>
          </div>
          <button class="btn-solid" id="btnAddExperience" type="button">
            <i class="bi bi-plus-circle"></i> ${text.addExperience}
          </button>
        </div>
        <div class="admin-items-grid">
          ${items.length === 0 ? `<p class="lead">${text.emptyItems}</p>` : items.map((item, idx) => {
            const role = window.PortfolioData.getText(item.role, l);
            const period = window.PortfolioData.getText(item.period, l);
            const desc = window.PortfolioData.getText(item.description, l);
            const isIntern = item.type === "internship";

            return `
              <article class="admin-item-card" data-id="${item.id}">
                <div class="admin-item-main">
                  <div class="admin-item-meta">
                    <span class="badge ${isIntern ? 'badge-intern' : 'badge-job'}">${isIntern ? text.internship : text.job}</span>
                    <span class="text-muted">${escapeHtml(period)}</span>
                  </div>
                  <h3 class="admin-item-title">${escapeHtml(role)} <span class="text-muted">· ${escapeHtml(item.company)}</span></h3>
                  <p class="admin-item-desc">${escapeHtml(desc)}</p>
                  <div class="tag-row">
                    ${(item.tags || []).map((tg) => `<span class="tag">${escapeHtml(tg)}</span>`).join("")}
                  </div>
                </div>
                <div class="admin-item-actions">
                  <button class="btn-action" data-edit-exp="${item.id}" title="${text.edit}"><i class="bi bi-pencil"></i></button>
                  <button class="btn-action" data-move-exp-up="${idx}" ${idx === 0 ? 'disabled' : ''} title="${text.moveUp}"><i class="bi bi-arrow-up"></i></button>
                  <button class="btn-action" data-move-exp-down="${idx}" ${idx === items.length - 1 ? 'disabled' : ''} title="${text.moveDown}"><i class="bi bi-arrow-down"></i></button>
                  <button class="btn-action btn-action-danger" data-del-exp="${item.id}" title="${text.remove}"><i class="bi bi-trash"></i></button>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `;

      document.getElementById("btnAddExperience").addEventListener("click", () => openExperienceModal());

      panel.querySelectorAll("[data-edit-exp]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-edit-exp");
          const item = items.find((i) => i.id === id);
          if (item) openExperienceModal(item);
        });
      });

      panel.querySelectorAll("[data-move-exp-up]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-move-exp-up"), 10);
          if (idx > 0) {
            const temp = items[idx];
            items[idx] = items[idx - 1];
            items[idx - 1] = temp;
            window.PortfolioData.saveExperiences(items);
            render();
          }
        });
      });

      panel.querySelectorAll("[data-move-exp-down]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-move-exp-down"), 10);
          if (idx < items.length - 1) {
            const temp = items[idx];
            items[idx] = items[idx + 1];
            items[idx + 1] = temp;
            window.PortfolioData.saveExperiences(items);
            render();
          }
        });
      });

      panel.querySelectorAll("[data-del-exp]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!confirm(text.confirmDelete)) return;
          const id = btn.getAttribute("data-del-exp");
          const updated = items.filter((i) => i.id !== id);
          window.PortfolioData.saveExperiences(updated);
          showToast(text.deletedSuccess);
          render();
        });
      });
    }

    if (activeTab === "education") {
      const items = window.PortfolioData.getEducation();
      panel.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h2>${text.tabEducation} (${items.length})</h2>
            <p class="text-muted">Adicione ou edite graus de formação e certificados.</p>
          </div>
          <button class="btn-solid" id="btnAddEducation" type="button">
            <i class="bi bi-plus-circle"></i> ${text.addEducation}
          </button>
        </div>
        <div class="admin-items-grid">
          ${items.length === 0 ? `<p class="lead">${text.emptyItems}</p>` : items.map((item, idx) => {
            const degree = window.PortfolioData.getText(item.degree, l);
            const inst = window.PortfolioData.getText(item.institution, l);
            const period = window.PortfolioData.getText(item.period, l);
            const desc = window.PortfolioData.getText(item.description, l);

            return `
              <article class="admin-item-card" data-id="${item.id}">
                <div class="admin-item-main">
                  <div class="admin-item-meta">
                    <span class="badge badge-edu">${escapeHtml(window.PortfolioData.getText(item.level, l) || 'Educação')}</span>
                    <span class="text-muted">${escapeHtml(period)}</span>
                  </div>
                  <h3 class="admin-item-title">${escapeHtml(degree)} <span class="text-muted">· ${escapeHtml(inst)}</span></h3>
                  <p class="admin-item-desc">${escapeHtml(desc)}</p>
                </div>
                <div class="admin-item-actions">
                  <button class="btn-action" data-edit-edu="${item.id}" title="${text.edit}"><i class="bi bi-pencil"></i></button>
                  <button class="btn-action" data-move-edu-up="${idx}" ${idx === 0 ? 'disabled' : ''} title="${text.moveUp}"><i class="bi bi-arrow-up"></i></button>
                  <button class="btn-action" data-move-edu-down="${idx}" ${idx === items.length - 1 ? 'disabled' : ''} title="${text.moveDown}"><i class="bi bi-arrow-down"></i></button>
                  <button class="btn-action btn-action-danger" data-del-edu="${item.id}" title="${text.remove}"><i class="bi bi-trash"></i></button>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `;

      document.getElementById("btnAddEducation").addEventListener("click", () => openEducationModal());

      panel.querySelectorAll("[data-edit-edu]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-edit-edu");
          const item = items.find((i) => i.id === id);
          if (item) openEducationModal(item);
        });
      });

      panel.querySelectorAll("[data-move-edu-up]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-move-edu-up"), 10);
          if (idx > 0) {
            const temp = items[idx];
            items[idx] = items[idx - 1];
            items[idx - 1] = temp;
            window.PortfolioData.saveEducation(items);
            render();
          }
        });
      });

      panel.querySelectorAll("[data-move-edu-down]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-move-edu-down"), 10);
          if (idx < items.length - 1) {
            const temp = items[idx];
            items[idx] = items[idx + 1];
            items[idx + 1] = temp;
            window.PortfolioData.saveEducation(items);
            render();
          }
        });
      });

      panel.querySelectorAll("[data-del-edu]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!confirm(text.confirmDelete)) return;
          const id = btn.getAttribute("data-del-edu");
          const updated = items.filter((i) => i.id !== id);
          window.PortfolioData.saveEducation(updated);
          showToast(text.deletedSuccess);
          render();
        });
      });
    }

    if (activeTab === "projects") {
      const items = window.PortfolioData.getProjects();
      panel.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h2>${text.tabProjects} (${items.length})</h2>
            <p class="text-muted">Adicione, edite ou reorganize os projetos do portfólio.</p>
          </div>
          <button class="btn-solid" id="btnAddProject" type="button">
            <i class="bi bi-plus-circle"></i> ${text.addProject}
          </button>
        </div>
        <div class="admin-items-grid">
          ${items.length === 0 ? `<p class="lead">${text.emptyItems}</p>` : items.map((item, idx) => {
            const desc = window.PortfolioData.getText(item.description, l);

            return `
              <article class="admin-item-card admin-project-card" data-id="${item.id}">
                ${item.image ? `<div class="admin-proj-thumb"><img src="${item.image}" alt="${escapeHtml(item.title)}"></div>` : ""}
                <div class="admin-item-main">
                  <h3 class="admin-item-title">${escapeHtml(item.title)}</h3>
                  <p class="admin-item-desc">${escapeHtml(desc)}</p>
                  <div class="tag-row">
                    ${(item.tags || []).map((tg) => `<span class="tag">${escapeHtml(tg)}</span>`).join("")}
                  </div>
                  ${item.link ? `<div class="small text-muted mt-2"><i class="bi bi-link-45deg"></i> ${escapeHtml(item.link)}</div>` : ""}
                </div>
                <div class="admin-item-actions">
                  <button class="btn-action" data-edit-proj="${item.id}" title="${text.edit}"><i class="bi bi-pencil"></i></button>
                  <button class="btn-action" data-move-proj-up="${idx}" ${idx === 0 ? 'disabled' : ''} title="${text.moveUp}"><i class="bi bi-arrow-up"></i></button>
                  <button class="btn-action" data-move-proj-down="${idx}" ${idx === items.length - 1 ? 'disabled' : ''} title="${text.moveDown}"><i class="bi bi-arrow-down"></i></button>
                  <button class="btn-action btn-action-danger" data-del-proj="${item.id}" title="${text.remove}"><i class="bi bi-trash"></i></button>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `;

      document.getElementById("btnAddProject").addEventListener("click", () => openProjectModal());

      panel.querySelectorAll("[data-edit-proj]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-edit-proj");
          const item = items.find((i) => i.id === id);
          if (item) openProjectModal(item);
        });
      });

      panel.querySelectorAll("[data-move-proj-up]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-move-proj-up"), 10);
          if (idx > 0) {
            const temp = items[idx];
            items[idx] = items[idx - 1];
            items[idx - 1] = temp;
            window.PortfolioData.saveProjects(items);
            render();
          }
        });
      });

      panel.querySelectorAll("[data-move-proj-down]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-move-proj-down"), 10);
          if (idx < items.length - 1) {
            const temp = items[idx];
            items[idx] = items[idx + 1];
            items[idx + 1] = temp;
            window.PortfolioData.saveProjects(items);
            render();
          }
        });
      });

      panel.querySelectorAll("[data-del-proj]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!confirm(text.confirmDelete)) return;
          const id = btn.getAttribute("data-del-proj");
          const updated = items.filter((i) => i.id !== id);
          window.PortfolioData.saveProjects(updated);
          showToast(text.deletedSuccess);
          render();
        });
      });
    }

    if (activeTab === "messages") {
      const messages = window.PortfolioAdmin.readMessages();
      panel.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h2>${text.tabMessages} (${messages.length})</h2>
            <p class="text-muted">${text.lead}</p>
          </div>
        </div>
        <div class="admin-list">
          ${messages.length === 0 ? `<p class="lead">${text.emptyMessages}</p>` : messages.map((item) => `
            <article class="message-item ${item.read ? "" : "is-unread"}" data-id="${item.id}">
              <div class="message-meta">
                <strong>${escapeHtml(item.name)}</strong>
                <span>${new Date(item.createdAt).toLocaleString(l === "pt" ? "pt-PT" : "en-US")}${item.read ? "" : " · " + text.unread}</span>
              </div>
              <p><a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a></p>
              <p><strong>${escapeHtml(item.subject || (l === "pt" ? "Sem assunto" : "No subject"))}</strong></p>
              <p>${escapeHtml(item.message)}</p>
              <div class="hero-actions">
                <button class="btn-ghost" data-read="${item.id}" type="button">${text.mark}</button>
                <button class="btn-ghost" data-delete="${item.id}" type="button">${text.remove}</button>
              </div>
            </article>
          `).join("")}
        </div>
      `;

      panel.querySelectorAll("[data-read]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const items = window.PortfolioAdmin.readMessages().map((item) =>
            item.id === btn.getAttribute("data-read") ? { ...item, read: true } : item
          );
          window.PortfolioAdmin.writeMessages(items);
          render();
        });
      });

      panel.querySelectorAll("[data-delete]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const items = window.PortfolioAdmin.readMessages().filter((item) => item.id !== btn.getAttribute("data-delete"));
          window.PortfolioAdmin.writeMessages(items);
          render();
        });
      });
    }

    if (activeTab === "backup") {
      const jsonStr = window.PortfolioData.exportAll();
      panel.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h2>${text.tabBackup}</h2>
            <p class="text-muted">Exporte, importe ou reponha os dados originais do portfólio.</p>
          </div>
        </div>

        <div class="backup-grid">
          <div class="admin-card-inner">
            <h3><i class="bi bi-download"></i> ${text.exportJson}</h3>
            <p class="text-muted small">Descarregue ou copie a configuração completa em formato JSON.</p>
            <div class="hero-actions mb-3">
              <button class="btn-solid" id="btnDownloadJson" type="button"><i class="bi bi-file-earmark-arrow-down"></i> ${text.exportJson}</button>
              <button class="btn-ghost" id="btnCopyJson" type="button"><i class="bi bi-clipboard"></i> ${text.copyJson}</button>
            </div>
            <textarea class="json-preview" id="jsonExportArea" readonly rows="8">${escapeHtml(jsonStr)}</textarea>
          </div>

          <div class="admin-card-inner">
            <h3><i class="bi bi-upload"></i> ${text.importJson}</h3>
            <p class="text-muted small">Cole um JSON válido para restaurar ou atualizar os dados.</p>
            <textarea class="json-preview" id="jsonImportArea" rows="6" placeholder='{"experiences": [...], ...}'></textarea>
            <div class="hero-actions mt-3">
              <button class="btn-solid" id="btnApplyImport" type="button"><i class="bi bi-check2-circle"></i> Aplicar Dados</button>
            </div>
          </div>

          <div class="admin-card-inner border-danger-soft">
            <h3 class="text-danger"><i class="bi bi-arrow-counterclockwise"></i> ${text.resetDefaults}</h3>
            <p class="text-muted small">Repõe a experiência, educação e projetos para o estado padrão do portfólio (incluindo Espiraleducada e Mestrado em Ciência de Computadores).</p>
            <button class="btn-solid btn-danger" id="btnResetAll" type="button"><i class="bi bi-exclamation-triangle"></i> ${text.resetDefaults}</button>
          </div>
        </div>
      `;

      document.getElementById("btnDownloadJson").addEventListener("click", () => {
        const blob = new Blob([window.PortfolioData.exportAll()], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });

      document.getElementById("btnCopyJson").addEventListener("click", () => {
        navigator.clipboard.writeText(window.PortfolioData.exportAll()).then(() => {
          showToast(text.copied);
        });
      });

      document.getElementById("btnApplyImport").addEventListener("click", () => {
        const val = document.getElementById("jsonImportArea").value.trim();
        if (!val) return;
        const ok = window.PortfolioData.importAll(val);
        if (ok) {
          showToast(text.savedSuccess);
          render();
        } else {
          alert("Erro ao importar JSON. Verifique o formato.");
        }
      });

      document.getElementById("btnResetAll").addEventListener("click", () => {
        if (!confirm(text.confirmReset)) return;
        window.PortfolioData.resetAll();
        showToast(text.savedSuccess);
        render();
      });
    }
  }

  // Experience Modal
  function openExperienceModal(item) {
    const text = t();
    const isEdit = !!item;
    const data = item || {
      id: "exp-" + Date.now(),
      company: "",
      companyShort: "",
      type: "job",
      role: { pt: "", en: "" },
      period: { pt: "", en: "" },
      periodCv: { pt: "", en: "" },
      sub: { pt: "", en: "" },
      description: { pt: "", en: "" },
      tags: [],
      url: ""
    };

    const overlay = document.getElementById("adminModalOverlay");
    const box = document.getElementById("adminModalBox");

    box.innerHTML = `
      <div class="modal-header">
        <h2>${isEdit ? 'Editar Experiência' : 'Nova Experiência'}</h2>
        <button class="modal-close" id="modalCloseBtn" type="button"><i class="bi bi-x-lg"></i></button>
      </div>
      <form id="expForm" class="admin-modal-form">
        <div class="form-row">
          <label class="form-col">
            Tipo
            <select name="type">
              <option value="job" ${data.type !== 'internship' ? 'selected' : ''}>Emprego / Trabalho</option>
              <option value="internship" ${data.type === 'internship' ? 'selected' : ''}>Estágio</option>
            </select>
          </label>
          <label class="form-col">
            Empresa / Entidade *
            <input type="text" name="company" required value="${escapeHtml(data.company)}" placeholder="Ex: Espiraleducada - Formação e Consultoria...">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Nome curto da empresa (para o CV PDF)
            <input type="text" name="companyShort" value="${escapeHtml(data.companyShort)}" placeholder="Ex: Espiraleducada">
          </label>
          <label class="form-col">
            Website / Link (opcional)
            <input type="text" name="url" value="${escapeHtml(data.url)}" placeholder="https://...">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Cargo (Português) *
            <input type="text" name="role_pt" required value="${escapeHtml(data.role?.pt)}" placeholder="Ex: Full Stack Web Developer">
          </label>
          <label class="form-col">
            Cargo (Inglês) *
            <input type="text" name="role_en" required value="${escapeHtml(data.role?.en)}" placeholder="Ex: Full Stack Web Developer">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Período Página Web (PT) *
            <input type="text" name="period_pt" required value="${escapeHtml(data.period?.pt)}" placeholder="Ex: Abril de 2026 a presente">
          </label>
          <label class="form-col">
            Período Página Web (EN) *
            <input type="text" name="period_en" required value="${escapeHtml(data.period?.en)}" placeholder="Ex: April 2026 to Present">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Período Curto CV PDF (PT)
            <input type="text" name="periodCv_pt" value="${escapeHtml(data.periodCv?.pt || data.period?.pt)}" placeholder="Ex: Abr 2026 a presente">
          </label>
          <label class="form-col">
            Período Curto CV PDF (EN)
            <input type="text" name="periodCv_en" value="${escapeHtml(data.periodCv?.en || data.period?.en)}" placeholder="Ex: Apr 2026 to Present">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Subtítulo / Regime (PT)
            <input type="text" name="sub_pt" value="${escapeHtml(data.sub?.pt)}" placeholder="Ex: Part-time, 25 horas">
          </label>
          <label class="form-col">
            Subtítulo / Regime (EN)
            <input type="text" name="sub_en" value="${escapeHtml(data.sub?.en)}" placeholder="Ex: Part-time, 25 hours">
          </label>
        </div>

        <label>
          Descrição (Português) *
          <textarea name="desc_pt" required rows="3">${escapeHtml(data.description?.pt)}</textarea>
        </label>

        <label>
          Descrição (Inglês) *
          <textarea name="desc_en" required rows="3">${escapeHtml(data.description?.en)}</textarea>
        </label>

        <label>
          Tags / Competências (separadas por vírgula)
          <input type="text" name="tags" value="${escapeHtml((data.tags || []).join(', '))}" placeholder="Full Stack, REST API, SQL">
        </label>

        <div class="modal-footer">
          <button type="button" class="btn-ghost" id="modalCancelBtn">${text.cancel}</button>
          <button type="submit" class="btn-solid">${text.save}</button>
        </div>
      </form>
    `;

    overlay.style.display = "flex";

    const closeModal = () => { overlay.style.display = "none"; };
    document.getElementById("modalCloseBtn").onclick = closeModal;
    document.getElementById("modalCancelBtn").onclick = closeModal;

    document.getElementById("expForm").onsubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const tags = form.tags.value.split(",").map((s) => s.trim()).filter(Boolean);

      const updated = {
        id: data.id,
        company: form.company.value.trim(),
        companyShort: form.companyShort.value.trim() || form.company.value.trim(),
        type: form.type.value,
        role: {
          pt: form.role_pt.value.trim(),
          en: form.role_en.value.trim()
        },
        period: {
          pt: form.period_pt.value.trim(),
          en: form.period_en.value.trim()
        },
        periodCv: {
          pt: form.periodCv_pt.value.trim() || form.period_pt.value.trim(),
          en: form.periodCv_en.value.trim() || form.period_en.value.trim()
        },
        sub: {
          pt: form.sub_pt.value.trim(),
          en: form.sub_en.value.trim()
        },
        description: {
          pt: form.desc_pt.value.trim(),
          en: form.desc_en.value.trim()
        },
        tags,
        url: form.url.value.trim()
      };

      const items = window.PortfolioData.getExperiences();
      const existingIdx = items.findIndex((i) => i.id === data.id);
      if (existingIdx >= 0) {
        items[existingIdx] = updated;
      } else {
        items.unshift(updated);
      }
      window.PortfolioData.saveExperiences(items);
      closeModal();
      showToast(text.savedSuccess);
      render();
    };
  }

  // Education Modal
  function openEducationModal(item) {
    const text = t();
    const isEdit = !!item;
    const data = item || {
      id: "edu-" + Date.now(),
      degree: { pt: "", en: "" },
      institution: { pt: "", en: "" },
      level: { pt: "", en: "" },
      area: { pt: "", en: "" },
      period: { pt: "", en: "" },
      periodCv: { pt: "", en: "" },
      location: { pt: "", en: "" },
      description: { pt: "", en: "" },
      keyDetails: { pt: "", en: "" }
    };

    const overlay = document.getElementById("adminModalOverlay");
    const box = document.getElementById("adminModalBox");

    box.innerHTML = `
      <div class="modal-header">
        <h2>${isEdit ? 'Editar Educação' : 'Nova Educação'}</h2>
        <button class="modal-close" id="modalCloseBtn" type="button"><i class="bi bi-x-lg"></i></button>
      </div>
      <form id="eduForm" class="admin-modal-form">
        <div class="form-row">
          <label class="form-col">
            Grau / Curso (Português) *
            <input type="text" name="degree_pt" required value="${escapeHtml(data.degree?.pt)}" placeholder="Ex: Mestrado em Ciência de Computadores">
          </label>
          <label class="form-col">
            Grau / Curso (Inglês) *
            <input type="text" name="degree_en" required value="${escapeHtml(data.degree?.en)}" placeholder="Ex: Master's in Computer Science">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Instituição (Português)
            <input type="text" name="inst_pt" value="${escapeHtml(data.institution?.pt)}" placeholder="Ex: Universidade de Aveiro">
          </label>
          <label class="form-col">
            Instituição (Inglês)
            <input type="text" name="inst_en" value="${escapeHtml(data.institution?.en)}" placeholder="Ex: Universidade de Aveiro">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Nível / Tipo (PT)
            <input type="text" name="level_pt" value="${escapeHtml(data.level?.pt)}" placeholder="Ex: Mestrado, Licenciatura">
          </label>
          <label class="form-col">
            Nível / Tipo (EN)
            <input type="text" name="level_en" value="${escapeHtml(data.level?.en)}" placeholder="Ex: Master's Degree">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Período Página Web (PT) *
            <input type="text" name="period_pt" required value="${escapeHtml(data.period?.pt)}" placeholder="Ex: Setembro de 2026 a presente">
          </label>
          <label class="form-col">
            Período Página Web (EN) *
            <input type="text" name="period_en" required value="${escapeHtml(data.period?.en)}" placeholder="Ex: September 2026 to Present">
          </label>
        </div>

        <div class="form-row">
          <label class="form-col">
            Período Curto CV PDF (PT)
            <input type="text" name="periodCv_pt" value="${escapeHtml(data.periodCv?.pt || data.period?.pt)}" placeholder="Ex: Set 2026 a presente">
          </label>
          <label class="form-col">
            Período Curto CV PDF (EN)
            <input type="text" name="periodCv_en" value="${escapeHtml(data.periodCv?.en || data.period?.en)}" placeholder="Ex: Sep 2026 to Present">
          </label>
        </div>

        <label>
          Descrição (Português)
          <textarea name="desc_pt" rows="3">${escapeHtml(data.description?.pt)}</textarea>
        </label>

        <label>
          Descrição (Inglês)
          <textarea name="desc_en" rows="3">${escapeHtml(data.description?.en)}</textarea>
        </label>

        <div class="modal-footer">
          <button type="button" class="btn-ghost" id="modalCancelBtn">${text.cancel}</button>
          <button type="submit" class="btn-solid">${text.save}</button>
        </div>
      </form>
    `;

    overlay.style.display = "flex";

    const closeModal = () => { overlay.style.display = "none"; };
    document.getElementById("modalCloseBtn").onclick = closeModal;
    document.getElementById("modalCancelBtn").onclick = closeModal;

    document.getElementById("eduForm").onsubmit = (e) => {
      e.preventDefault();
      const form = e.target;

      const updated = {
        id: data.id,
        degree: {
          pt: form.degree_pt.value.trim(),
          en: form.degree_en.value.trim()
        },
        institution: {
          pt: form.inst_pt.value.trim() || form.degree_pt.value.trim(),
          en: form.inst_en.value.trim() || form.degree_en.value.trim()
        },
        level: {
          pt: form.level_pt.value.trim() || form.degree_pt.value.trim(),
          en: form.level_en.value.trim() || form.degree_en.value.trim()
        },
        area: {
          pt: form.degree_pt.value.trim(),
          en: form.degree_en.value.trim()
        },
        period: {
          pt: form.period_pt.value.trim(),
          en: form.period_en.value.trim()
        },
        periodCv: {
          pt: form.periodCv_pt.value.trim() || form.period_pt.value.trim(),
          en: form.periodCv_en.value.trim() || form.period_en.value.trim()
        },
        location: data.location || { pt: "", en: "" },
        description: {
          pt: form.desc_pt.value.trim(),
          en: form.desc_en.value.trim()
        },
        keyDetails: data.keyDetails || { pt: "", en: "" }
      };

      const items = window.PortfolioData.getEducation();
      const existingIdx = items.findIndex((i) => i.id === data.id);
      if (existingIdx >= 0) {
        items[existingIdx] = updated;
      } else {
        items.unshift(updated);
      }
      window.PortfolioData.saveEducation(items);
      closeModal();
      showToast(text.savedSuccess);
      render();
    };
  }

  // Project Modal
  function openProjectModal(item) {
    const text = t();
    const isEdit = !!item;
    const data = item || {
      id: "proj-" + Date.now(),
      title: "",
      link: "",
      image: "assets/project1.png",
      tags: [],
      description: { pt: "", en: "" }
    };

    const overlay = document.getElementById("adminModalOverlay");
    const box = document.getElementById("adminModalBox");

    box.innerHTML = `
      <div class="modal-header">
        <h2>${isEdit ? 'Editar Projeto' : 'Novo Projeto'}</h2>
        <button class="modal-close" id="modalCloseBtn" type="button"><i class="bi bi-x-lg"></i></button>
      </div>
      <form id="projForm" class="admin-modal-form">
        <label>
          Título do Projeto *
          <input type="text" name="title" required value="${escapeHtml(data.title)}" placeholder="Ex: Auto Sys PT">
        </label>

        <div class="form-row">
          <label class="form-col">
            Caminho da Imagem ou URL
            <input type="text" name="image" value="${escapeHtml(data.image)}" placeholder="Ex: assets/project1.png">
          </label>
          <label class="form-col">
            Link do Projeto (opcional)
            <input type="text" name="link" value="${escapeHtml(data.link)}" placeholder="Ex: projects/autosyspt/ ou https://...">
          </label>
        </div>

        <label>
          Tags / Tecnologias (separadas por vírgula)
          <input type="text" name="tags" value="${escapeHtml((data.tags || []).join(', '))}" placeholder="Full Stack, REST API, SQL">
        </label>

        <label>
          Descrição (Português) *
          <textarea name="desc_pt" required rows="3">${escapeHtml(data.description?.pt)}</textarea>
        </label>

        <label>
          Descrição (Inglês) *
          <textarea name="desc_en" required rows="3">${escapeHtml(data.description?.en)}</textarea>
        </label>

        <div class="modal-footer">
          <button type="button" class="btn-ghost" id="modalCancelBtn">${text.cancel}</button>
          <button type="submit" class="btn-solid">${text.save}</button>
        </div>
      </form>
    `;

    overlay.style.display = "flex";

    const closeModal = () => { overlay.style.display = "none"; };
    document.getElementById("modalCloseBtn").onclick = closeModal;
    document.getElementById("modalCancelBtn").onclick = closeModal;

    document.getElementById("projForm").onsubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const tags = form.tags.value.split(",").map((s) => s.trim()).filter(Boolean);

      const updated = {
        id: data.id,
        title: form.title.value.trim(),
        link: form.link.value.trim(),
        image: form.image.value.trim(),
        tags,
        description: {
          pt: form.desc_pt.value.trim(),
          en: form.desc_en.value.trim()
        }
      };

      const items = window.PortfolioData.getProjects();
      const existingIdx = items.findIndex((i) => i.id === data.id);
      if (existingIdx >= 0) {
        items[existingIdx] = updated;
      } else {
        items.unshift(updated);
      }
      window.PortfolioData.saveProjects(items);
      closeModal();
      showToast(text.savedSuccess);
      render();
    };
  }

  // Close modal on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const overlay = document.getElementById("adminModalOverlay");
      if (overlay) overlay.style.display = "none";
    }
  });

  window.addEventListener("hashchange", () => {
    activeTab = window.location.hash.replace("#", "") || "experience";
    render();
  });

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("site:lang", render);
})();
