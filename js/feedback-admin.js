// Moderation page for client testimonials (feedback-admin.html).
// Talks to /api/feedback/admin with the ADMIN_TOKEN secret as a bearer token.
(function () {
  const TOKEN_KEY = "feedback.adminToken";
  const $ = (id) => document.getElementById(id);
  const login = $("fbLogin");
  const panel = $("fbPanel");
  const list = $("fbList");
  const status = $("fbStatus");
  let items = [];
  let filter = "pending";

  const store = {
    get: () => { try { return localStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; } },
    set: (v) => { try { localStorage.setItem(TOKEN_KEY, v); } catch {} },
    clear: () => { try { localStorage.removeItem(TOKEN_KEY); } catch {} }
  };

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  async function api(method, body) {
    const response = await fetch("/api/feedback/admin", {
      method,
      headers: { Authorization: "Bearer " + store.get(), "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) {
      const error = new Error(result.message || "failed");
      error.status = response.status;
      throw error;
    }
    return result.items;
  }

  function render() {
    document.querySelectorAll("[data-filter]").forEach((b) => {
      const key = b.getAttribute("data-filter");
      b.setAttribute("aria-pressed", String(key === filter));
      b.querySelector("span").textContent = items.filter((i) => i.status === key).length;
    });
    const shown = items.filter((i) => i.status === filter);
    if (!shown.length) {
      list.innerHTML = `<li class="fb-empty">Nada aqui por agora.</li>`;
      return;
    }
    list.innerHTML = shown.map((i) => `
      <li class="fb-item" data-id="${esc(i.id)}">
        <div class="fb-item__head">
          <span class="fb-stars" aria-label="${i.rating} de 5">${"★".repeat(i.rating)}<span>${"★".repeat(5 - i.rating)}</span></span>
          <span class="mono">${esc(new Date(i.createdAt).toLocaleString("pt-PT"))} · ${esc(i.lang.toUpperCase())}</span>
        </div>
        <p class="fb-item__text">${esc(i.text).replace(/\n/g, "<br>")}</p>
        <p class="fb-item__who"><strong>${esc(i.name)}</strong>${[i.role, i.company].filter(Boolean).map((v) => " · " + esc(v)).join("")}${i.email ? ` · <a href="mailto:${esc(i.email)}">${esc(i.email)}</a>` : ""}</p>
        <div class="fb-item__actions">
          ${i.status !== "approved" ? `<button class="btn btn--green" type="button" data-act="approved">Publicar</button>` : ""}
          ${i.status !== "hidden" ? `<button class="btn btn--line" type="button" data-act="hidden">Ocultar</button>` : ""}
          ${i.status === "hidden" ? `<button class="btn btn--line" type="button" data-act="pending">Voltar a rever</button>` : ""}
          <button class="btn btn--line fb-delete" type="button" data-act="delete">Apagar</button>
        </div>
      </li>`).join("");
  }

  async function load() {
    try {
      items = await api("GET");
      login.hidden = true;
      panel.hidden = false;
      $("fbLogout").hidden = false;
      render();
    } catch (error) {
      login.hidden = false;
      panel.hidden = true;
      $("fbLoginStatus").className = "form-status is-error";
      $("fbLoginStatus").textContent = error.status === 401 ? "Código errado."
        : error.status === 503 ? "Falta configurar o ADMIN_TOKEN no Cloudflare."
        : "Não foi possível carregar. Tente de novo.";
      if (error.status === 401) store.clear();
    }
  }

  login.addEventListener("submit", (e) => {
    e.preventDefault();
    store.set($("fbToken").value.trim());
    load();
  });
  $("fbLogout").addEventListener("click", () => {
    store.clear();
    window.location.reload();
  });

  document.querySelector(".fb-filter").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    filter = b.getAttribute("data-filter");
    render();
  });

  list.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const id = b.closest("[data-id]").getAttribute("data-id");
    const act = b.getAttribute("data-act");
    if (act === "delete" && !window.confirm("Apagar este feedback de vez?")) return;
    b.disabled = true;
    try {
      items = await api("POST", act === "delete" ? { id, action: "delete" } : { id, status: act });
      status.className = "form-status is-ok";
      status.textContent = act === "approved" ? "Publicado. Aparece no site dentro de alguns minutos." : "Guardado.";
      render();
    } catch {
      status.className = "form-status is-error";
      status.textContent = "Não foi possível guardar. Tente de novo.";
      b.disabled = false;
    }
  });

  // Link builder
  function buildLink() {
    const lang = $("lkLang").value;
    const params = new URLSearchParams();
    const add = (key, value) => { if (value.trim()) params.set(key, value.trim()); };
    add(lang === "pt" ? "nome" : "name", $("lkName").value);
    add(lang === "pt" ? "empresa" : "company", $("lkCompany").value);
    add(lang === "pt" ? "cargo" : "role", $("lkRole").value);
    const query = params.toString();
    const url = `${window.location.origin}/${lang === "pt" ? "pt/" : ""}feedback.html${query ? "?" + query : ""}`;
    const first = $("lkName").value.trim().split(/\s+/)[0];
    const message = lang === "pt"
      ? `Olá${first ? " " + first : ""}! Obrigado por trabalhar comigo. Se puder, deixe-me a sua opinião sobre o projeto aqui, demora dois minutos: ${url}`
      : `Hi${first ? " " + first : ""}! Thank you for working with me. If you can, please share your thoughts on the project here, it takes two minutes: ${url}`;
    $("lkUrl").value = url;
    $("lkWa").href = "https://wa.me/?text=" + encodeURIComponent(message);
    $("lkMail").href = `mailto:?subject=${encodeURIComponent(lang === "pt" ? "A sua opinião sobre o projeto" : "Your thoughts on the project")}&body=${encodeURIComponent(message)}`;
  }
  ["lkName", "lkCompany", "lkRole", "lkLang"].forEach((id) => $(id).addEventListener("input", buildLink));
  $("lkCopy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("lkUrl").value);
    } catch {
      $("lkUrl").select();
      document.execCommand("copy");
    }
    $("lkCopy").textContent = "Copiado ✓";
    setTimeout(() => { $("lkCopy").textContent = "Copiar link"; }, 1800);
  });
  buildLink();

  if (store.get()) load();
})();
