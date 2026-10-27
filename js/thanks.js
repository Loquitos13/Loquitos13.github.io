(function () {
  const isPt = /\/pt(?:\/|$)/.test(window.location.pathname);
  const fallback = "contact.html";

  // Only same-site paths are allowed as the way back, so the page can't be used to redirect elsewhere.
  function safePath(value) {
    if (!value || typeof value !== "string") return "";
    if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "";
    return value;
  }

  function backTarget() {
    const fromQuery = safePath(new URLSearchParams(window.location.search).get("voltar"));
    if (fromQuery) return fromQuery;
    try {
      const ref = new URL(document.referrer);
      if (ref.origin === window.location.origin && !/\/(obrigado|thanks)(\.html)?$/.test(ref.pathname)) {
        return ref.pathname + ref.search;
      }
    } catch {}
    return fallback;
  }

  const target = backTarget();

  function close(e) {
    if (e) e.preventDefault();
    document.body.classList.add("is-leaving");
    const go = () => window.location.replace(target);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) go();
    else setTimeout(go, 220);
  }

  document.querySelectorAll("[data-thanks-close]").forEach((el) => {
    if (el.tagName === "A") el.setAttribute("href", target);
    el.addEventListener("click", close);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close(e);
  });

  let name = "";
  try {
    name = (sessionStorage.getItem("contact.name") || "").trim().split(/\s+/)[0] || "";
    sessionStorage.removeItem("contact.name");
  } catch {}
  if (name) {
    const hello = document.getElementById("thanks-hello");
    if (hello) hello.textContent = (isPt ? "Obrigado, " : "Thank you, ") + name + "!";
  }

  const first = document.querySelector(".thanks__actions .btn");
  if (first) first.focus({ preventScroll: true });
})();
