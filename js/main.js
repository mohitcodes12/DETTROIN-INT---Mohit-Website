// Krishna International School — Redesign
// Small, dependency-free JS: nav toggle, ticker loop, scroll reveal, form validation.

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Duplicate ticker content so the CSS marquee loops seamlessly
  const track = document.querySelector(".ticker-track");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  // Scroll reveal
  // Only turn on the "start hidden, fade in on scroll" behavior once we know
  // JS is actually running. If anything below fails, content stays visible
  // (CSS default is opacity: 1 — see style.css).
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("js-reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));

    // Safety net: force everything visible after 2s no matter what,
    // in case an element never triggers the observer (e.g. very tall page).
    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("in-view"));
    }, 2000);
  }

  // Contact / admission enquiry form (client-side only — no backend in this assignment)
  const form = document.querySelector("#enquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        status.textContent = "Please fill in all required fields.";
        status.className = "form-status err";
        return;
      }
      status.textContent = "Thank you! Your enquiry has been received. Our admissions team will contact you shortly.";
      status.className = "form-status ok";
      form.reset();
    });
  }

  // ---------------------------------------------------------------
  // Polish pass additions below: navbar scroll state, scroll progress
  // bar, back-to-top button, counter animation, FAQ accordion.
  // All are small, dependency-free, and degrade harmlessly if the
  // related markup isn't present on a given page.
  // ---------------------------------------------------------------

  // Navbar scroll transition
  const header = document.querySelector(".site-header");

  // Scroll progress bar (created once, works on every page automatically)
  const progressTrack = document.createElement("div");
  progressTrack.className = "scroll-progress-track";
  progressTrack.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progressTrack);
  const progressBar = progressTrack.querySelector(".scroll-progress-bar");

  // Back-to-top button (created once, works on every page automatically)
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(backToTop);
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + "%";

      if (header) header.classList.toggle("scrolled", scrollTop > 10);
      backToTop.classList.toggle("visible", scrollTop > 500);

      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Counter animation for hero stat cards (data-count-to attribute)
  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute("data-count-to"));
      const decimals = parseInt(el.getAttribute("data-decimal") || "0", 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = target * eased;
        el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const counterIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterIO.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => counterIO.observe(el));
    } else {
      counters.forEach((el) => animateCounter(el));
    }
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close other open items for a cleaner single-open accordion
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
    });
  });
});