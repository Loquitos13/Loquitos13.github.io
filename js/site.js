(function () {
  const WHATSAPP = "351913417390";
  const lang = /\/pt(?:\/|$)/.test(window.location.pathname) ? "pt" : "en";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DEFAULT_MESSAGE = {
    pt: "Olá Diogo! Vi o seu site e gostava de pedir um orçamento.",
    en: "Hi Diogo! I saw your website and would like to ask for a quote."
  };

  function waLink(message) {
    return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message || DEFAULT_MESSAGE[lang]);
  }

  function bindWhatsApp() {
    document.querySelectorAll("[data-wa]").forEach((el) => {
      el.setAttribute("href", waLink(el.getAttribute("data-wa")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  function renderData() {
    const data = window.PortfolioData;
    if (!data) return;
    if (document.getElementById("heroTitle")) data.renderLanding(lang);
    if (document.querySelector(".project-grid")) data.renderProjects(lang);
    if (document.getElementById("resumeExperienceContainer")) data.renderResume(lang);
    window.dispatchEvent(new CustomEvent("portfolio:rendered"));
  }

  function bindMenu() {
    const menu = document.querySelector(".site-menu");
    const toggle = document.querySelector(".nav-toggle");
    if (!menu || !toggle) return;
    menu.addEventListener("click", (e) => {
      if (e.target instanceof Element && e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  function bindReveal() {
    const items = document.querySelectorAll(".reveal, .steps");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    items.forEach((el) => io.observe(el));
  }

  // Scroll-built sections: every [data-b] element gets --t from 0 (unbuilt) to 1 (built),
  // driven by its position in the viewport, so it assembles on the way down and comes apart
  // on the way up. Children of [data-stagger] inherit its build type with a growing delay.
  function bindBuild() {
    const hero = document.querySelector("[data-hero]");
    if (reduceMotion || (!hero && !document.querySelector("[data-b], [data-stagger]"))) return;
    document.documentElement.classList.add("motion");

    let items = [];
    let tops = [];
    let current = [];
    let heroX = 0;
    let running = false;

    const assign = () => {
      document.querySelectorAll("[data-stagger]").forEach((group) => {
        const type = group.getAttribute("data-stagger");
        Array.from(group.children).forEach((child, i) => {
          child.setAttribute("data-b", type);
          child.style.setProperty("--d", String(i));
        });
      });
      items = Array.from(document.querySelectorAll("[data-b]"));
      current = items.map((el) => {
        const t = parseFloat(el.style.getPropertyValue("--t"));
        return Number.isNaN(t) ? 0 : t;
      });
      measure();
    };

    // offsetTop ignores transforms, so an element's own motion never feeds back into its progress.
    const measure = () => {
      tops = items.map((el) => {
        let y = 0;
        let node = el;
        while (node) {
          y += node.offsetTop;
          node = node.offsetParent;
        }
        return y;
      });
    };

    const target = (i) => {
      const vh = window.innerHeight;
      const delay = parseFloat(items[i].style.getPropertyValue("--d")) || 0;
      const top = tops[i] - window.scrollY + delay * vh * 0.06;
      return Math.min(1, Math.max(0, (vh * 0.96 - top) / (vh * 0.34)));
    };

    const frame = () => {
      let moving = false;
      const goals = items.map((_, i) => target(i));
      items.forEach((el, i) => {
        const diff = goals[i] - current[i];
        if (Math.abs(diff) > 0.0015) {
          current[i] += diff * 0.14;
          moving = true;
        } else {
          current[i] = goals[i];
        }
        el.style.setProperty("--t", current[i].toFixed(4));
      });
      if (hero) {
        const goal = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.9)));
        heroX += (goal - heroX) * 0.2;
        if (Math.abs(goal - heroX) > 0.001) moving = true;
        else heroX = goal;
        hero.style.setProperty("--x", heroX.toFixed(4));
      }
      running = moving;
      if (moving) requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!running) {
        running = true;
        requestAnimationFrame(frame);
      }
    };

    assign();
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", () => { measure(); kick(); });
    window.addEventListener("load", () => { measure(); kick(); });
    window.addEventListener("portfolio:rendered", () => { assign(); kick(); });
    if ("ResizeObserver" in window) {
      new ResizeObserver(() => { measure(); kick(); }).observe(document.body);
    }
  }

  // The dp symbol reads the same after a half turn: d becomes p and p becomes d.
  // Marks with [data-turn] make that half turn as they cross the viewport.
  function bindTurn() {
    const marks = Array.from(document.querySelectorAll("[data-turn]"));
    if (!marks.length || reduceMotion) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      marks.forEach((mark) => {
        const box = (mark.parentElement || mark).getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh - box.top) / (vh + box.height)));
        mark.style.setProperty("--turn", (progress * 180).toFixed(2) + "deg");
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  // The floating WhatsApp button steps aside while a full WhatsApp call to action is on screen.
  function bindFloat() {
    const float = document.querySelector(".wa-float");
    const primaries = document.querySelectorAll("[data-wa-primary]");
    if (!float) return;
    if (!primaries.length || !("IntersectionObserver" in window)) {
      float.classList.remove("is-hidden");
      return;
    }
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      float.classList.toggle("is-hidden", visible.size > 0);
    });
    primaries.forEach((el) => io.observe(el));
  }

  // Project screens: one shared <dialog>, opened from any card with a gallery.
  function bindGallery() {
    const data = window.PortfolioData;
    if (!data || !document.querySelector(".project-grid")) return;
    const base = lang === "pt" ? "../" : "";
    const L = lang === "pt"
      ? { close: "Fechar", prev: "Ecrã anterior", next: "Ecrã seguinte", visit: "Ver projeto", of: "de", screen: "Ecrã" }
      : { close: "Close", prev: "Previous screen", next: "Next screen", visit: "View project", of: "of", screen: "Screen" };
    const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="${base}assets/brand/icons.svg#${name}"></use></svg>`;
    const resolve = (src) => (/^(https?:|data:)/i.test(src) ? src : base + src.replace(/^\.?\//, "").replace(/^\.\.\//, ""));

    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.innerHTML = `
      <div class="lightbox__bar">
        <div><h2 class="lightbox__title"></h2><p class="lightbox__count mono" aria-live="polite"></p></div>
        <div class="lightbox__actions">
          <a class="btn btn--line lightbox__visit" target="_blank" rel="noopener">${L.visit} ${icon("out")}</a>
          <button type="button" class="lightbox__close" aria-label="${L.close}">${icon("plus")}</button>
        </div>
      </div>
      <div class="lightbox__stage">
        <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="${L.prev}">${icon("arrow")}</button>
        <img class="lightbox__img" alt="" />
        <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="${L.next}">${icon("arrow")}</button>
      </div>
      <p class="lightbox__caption" aria-live="polite"></p>
      <div class="lightbox__thumbs"></div>`;
    document.body.appendChild(dialog);

    const img = dialog.querySelector(".lightbox__img");
    const thumbs = dialog.querySelector(".lightbox__thumbs");
    const count = dialog.querySelector(".lightbox__count");
    const caption = dialog.querySelector(".lightbox__caption");
    const visit = dialog.querySelector(".lightbox__visit");
    let shots = [];
    let index = 0;
    let title = "";

    const show = (i) => {
      index = (i + shots.length) % shots.length;
      const shot = shots[index];
      img.src = shot.src;
      img.alt = shot.caption ? `${title}: ${shot.caption}` : `${title}, ${L.screen.toLowerCase()} ${index + 1} ${L.of} ${shots.length}`;
      count.textContent = `${index + 1} / ${shots.length}`;
      caption.textContent = shot.caption;
      caption.hidden = !shot.caption;
      thumbs.querySelectorAll("button").forEach((b, n) => b.setAttribute("aria-current", String(n === index)));
      const next = new Image();
      next.src = shots[(index + 1) % shots.length].src;
    };

    const open = (id) => {
      const proj = data.getProjects().find((p) => p.id === id);
      if (!proj) return;
      // Gallery items are a path, or { src, caption: { pt, en } }.
      shots = (proj.gallery || []).filter(Boolean).map((item) => (typeof item === "string"
        ? { src: resolve(item), caption: "" }
        : { src: resolve(item.src || ""), caption: data.getText(item.caption, lang) })).filter((s) => s.src);
      if (!shots.length) return;
      title = proj.title;
      dialog.querySelector(".lightbox__title").textContent = title;
      const link = (proj.link || "").trim();
      visit.hidden = !/^https?:\/\//i.test(link);
      if (!visit.hidden) visit.href = link;
      thumbs.innerHTML = shots.map((shot, n) =>
        `<button type="button" aria-label="${L.screen} ${n + 1}${shot.caption ? ": " + data.escapeHtml(shot.caption) : ""}"><img src="${shot.src}" alt="" loading="lazy" /></button>`).join("");
      thumbs.hidden = shots.length < 2;
      dialog.querySelectorAll(".lightbox__nav").forEach((b) => { b.hidden = shots.length < 2; });
      show(0);
      dialog.showModal();
      document.documentElement.classList.add("has-lightbox");
    };

    document.addEventListener("click", (e) => {
      const trigger = e.target instanceof Element ? e.target.closest("[data-gallery]") : null;
      if (trigger) open(trigger.getAttribute("data-gallery"));
    });
    dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(index - 1));
    dialog.querySelector(".lightbox__nav--next").addEventListener("click", () => show(index + 1));
    thumbs.addEventListener("click", (e) => {
      const b = e.target instanceof Element ? e.target.closest("button") : null;
      if (b) show(Array.from(thumbs.children).indexOf(b));
    });
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => document.documentElement.classList.remove("has-lightbox"));
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });

    let startX = null;
    img.addEventListener("pointerdown", (e) => { startX = e.clientX; });
    img.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    });
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindWhatsApp();
    renderData();
    bindMenu();
    bindReveal();
    bindBuild();
    bindTurn();
    bindFloat();
    bindGallery();
    setYear();
  });

  window.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf("portfolio.") === 0) renderData();
  });
})();
