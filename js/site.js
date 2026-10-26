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
    setYear();
  });

  window.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf("portfolio.") === 0) renderData();
  });
})();
