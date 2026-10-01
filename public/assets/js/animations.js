/* ==========================================================================
   Scroll reveal (IntersectionObserver) + gentle hero parallax
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = null;

  function observe(root) {
    var items = (root || document).querySelectorAll(".reveal:not(.is-visible)");
    if (reduce || !("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("is-visible"); }); return; }
    if (!io) io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  window.observeReveals = observe;

  document.addEventListener("DOMContentLoaded", function () {
    observe();
    var media = document.querySelector(".hero__media");
    if (media && !reduce) {
      window.addEventListener("scroll", function () {
        media.style.transform = "translate3d(0," + Math.min(window.scrollY, 900) * 0.25 + "px,0)";
      }, { passive: true });
    }
  });
})();
