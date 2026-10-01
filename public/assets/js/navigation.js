/* ==========================================================================
   Header: glass → solid on scroll, active link, mobile drawer
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    var page = document.body.getAttribute("data-page");

    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.setAttribute("aria-current", "page");
    });

    if (header) {
      var bar = document.querySelector(".announce");
      var onScroll = function () {
        var scrolled = window.scrollY > 24;
        header.classList.toggle("is-scrolled", scrolled);
        // Keep the header just below the announcement bar, whatever its height.
        header.style.top = scrolled || !bar ? "0px" : bar.offsetHeight + "px";
      };
      window.addEventListener("resize", onScroll);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var drawer = document.getElementById("mobile-drawer");
    var toggle = document.querySelector(".nav__toggle");
    if (!drawer || !toggle) return;
    var closeBtn = drawer.querySelector("[data-drawer-close]");

    function open() {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
      setTimeout(function () { closeBtn.focus(); }, 50);
    }
    function close(returnFocus) {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", open);
    closeBtn.addEventListener("click", function () { close(true); });
    drawer.querySelector(".drawer__backdrop").addEventListener("click", function () { close(true); });
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { close(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("is-open")) close(true); });
  });
})();
