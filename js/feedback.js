// Client feedback form (feedback.html). The page is not linked anywhere: Diogo sends the link
// to a client, optionally with ?nome=&empresa=&cargo= (or ?name=&company=&role=) to prefill it.
(function () {
  const form = document.getElementById("feedbackForm");
  if (!form) return;
  const lang = /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  const status = document.getElementById("feedbackStatus");
  const done = document.getElementById("feedbackDone");
  const T = lang === "pt"
    ? {
        sending: "A enviar…",
        name: "Indique o seu nome.",
        rating: "Escolha uma avaliação de 1 a 5 estrelas.",
        text: "Escreva o testemunho (pelo menos algumas palavras).",
        email: "O email não parece válido.",
        consent: "Para publicar, preciso da sua autorização.",
        failed: "Não foi possível enviar agora. Tente de novo daqui a pouco, ou envie-me o texto para diogo@diogopintoit.pt."
      }
    : {
        sending: "Sending…",
        name: "Please enter your name.",
        rating: "Choose a rating from 1 to 5 stars.",
        text: "Please write your testimonial (at least a few words).",
        email: "That email does not look valid.",
        consent: "I need your permission to publish it.",
        failed: "It could not be sent right now. Please try again shortly, or email the text to diogo@diogopintoit.pt."
      };

  const params = new URLSearchParams(window.location.search);
  [["name", "nome"], ["company", "empresa"], ["role", "cargo"]].forEach(([field, alias]) => {
    const value = params.get(field) || params.get(alias);
    if (value && form.elements[field]) form.elements[field].value = value.slice(0, 80);
  });

  const setStatus = (message, kind) => {
    status.textContent = message;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = form.elements;
    const rating = Number((form.querySelector('input[name="rating"]:checked') || {}).value || 0);
    const payload = {
      name: f.name.value.trim(),
      email: f.email.value.trim(),
      role: f.role.value.trim(),
      company: f.company.value.trim(),
      rating,
      text: f.text.value.trim(),
      consent: f.consent.checked,
      lang,
      _gotcha: f._gotcha.value
    };

    const problem = !payload.name ? ["name", T.name]
      : !rating ? ["rating", T.rating]
      : payload.text.length < 10 ? ["text", T.text]
      : payload.email && !f.email.checkValidity() ? ["email", T.email]
      : !payload.consent ? ["consent", T.consent]
      : null;
    if (problem) {
      setStatus(problem[1], "error");
      const el = problem[0] === "rating" ? form.querySelector('input[name="rating"]') : f[problem[0]];
      if (el && el.focus) el.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    setStatus(T.sending);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) throw new Error(result.message || "send-failed");
      form.hidden = true;
      form.parentElement.querySelectorAll(":scope > h2, :scope > p").forEach((el) => { el.hidden = true; });
      done.hidden = false;
      done.focus();
    } catch {
      setStatus(T.failed, "error");
      button.disabled = false;
    }
  });
})();
