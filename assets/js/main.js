// Scroll-triggered reveals + mobile nav. Kept dependency-free.

(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // --- Scroll reveal ---
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll("[data-reveal]");

  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // optional stagger via data-reveal-delay (ms)
        var delay = entry.target.getAttribute("data-reveal-delay") || 0;
        setTimeout(function () { entry.target.classList.add("is-visible"); }, Number(delay));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  els.forEach(function (el) { io.observe(el); });
})();
