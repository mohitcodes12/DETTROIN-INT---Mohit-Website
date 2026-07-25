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
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
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
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
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
});