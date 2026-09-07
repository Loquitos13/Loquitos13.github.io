(function () {
  const SESSION_KEY = "portfolio.admin";
  const copy = {
    pt: {
      title: "Área reservada",
      lead: "Veja os contactos recebidos neste browser. Cada envio também segue para bdiogo511@gmail.com.",
      password: "Palavra-passe",
      enter: "Entrar",
      logout: "Sair",
      empty: "Ainda não há mensagens guardadas neste dispositivo.",
      unread: "por ler",
      mark: "Marcar como lida",
      remove: "Apagar",
      error: "Palavra-passe incorreta."
    },
    en: {
      title: "Private area",
      lead: "Review contacts saved in this browser. Each submission is also sent to bdiogo511@gmail.com.",
      password: "Password",
      enter: "Sign in",
      logout: "Sign out",
      empty: "No messages are stored on this device yet.",
      unread: "unread",
      mark: "Mark as read",
      remove: "Delete",
      error: "Incorrect password."
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

  function render() {
    const root = document.getElementById("adminApp");
    if (!root || !window.PortfolioAdmin) return;
    const text = t();
    document.title = text.title + " · Diogo Pinto";

    if (!isAuthed()) {
      root.innerHTML = `
        <div class="admin-card">
          <h1 class="page-title">${text.title}</h1>
          <p class="lead">${text.lead}</p>
          <form id="adminLogin" class="contact-form">
            <label>${text.password}
              <input type="password" name="password" autocomplete="current-password" required>
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
    const list = messages.length
      ? messages.map((item) => `
          <article class="message-item ${item.read ? "" : "is-unread"}" data-id="${item.id}">
            <div class="message-meta">
              <strong>${item.name}</strong>
              <span>${new Date(item.createdAt).toLocaleString(lang() === "pt" ? "pt-PT" : "en-US")}${item.read ? "" : " · " + text.unread}</span>
            </div>
            <p><a href="mailto:${item.email}">${item.email}</a></p>
            <p><strong>${item.subject || (lang() === "pt" ? "Sem assunto" : "No subject")}</strong></p>
            <p>${item.message}</p>
            <div class="hero-actions">
              <button class="btn-ghost" data-read="${item.id}" type="button">${text.mark}</button>
              <button class="btn-ghost" data-delete="${item.id}" type="button">${text.remove}</button>
            </div>
          </article>`).join("")
      : `<p class="lead">${text.empty}</p>`;

    root.innerHTML = `
      <div class="admin-card">
        <div class="hero-actions" style="justify-content:space-between;margin-bottom:1rem">
          <h1 class="page-title" style="margin:0">${text.title}</h1>
          <button class="btn-ghost" id="adminLogout" type="button">${text.logout}</button>
        </div>
        <p class="lead">${text.lead}</p>
        <div class="admin-list">${list}</div>
      </div>`;

    document.getElementById("adminLogout").addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      render();
    });

    root.querySelectorAll("[data-read]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const items = window.PortfolioAdmin.readMessages().map((item) =>
          item.id === btn.getAttribute("data-read") ? { ...item, read: true } : item
        );
        window.PortfolioAdmin.writeMessages(items);
        render();
      });
    });

    root.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const items = window.PortfolioAdmin.readMessages().filter((item) => item.id !== btn.getAttribute("data-delete"));
        window.PortfolioAdmin.writeMessages(items);
        render();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("site:lang", render);
})();
