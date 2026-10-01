/* ==========================================================================
   Language switching (EN / IT / BN / AR) with full RTL support for Arabic.
   The choice is kept in sessionStorage for the current browsing session.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "skyatlas.lang";
  var SUPPORTED = ["en", "it", "bn", "ar"];
  var RTL = ["ar"];
  var LOCALES = { en: "en-GB", it: "it-IT", bn: "bn-BD", ar: "ar" };

  function readStored() { try { return sessionStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }

  var I18n = {
    lang: "en",
    listeners: [],

    /** Translate a key with optional {placeholders}; falls back to English. */
    t: function (key, vars) {
      var dict = window.TRANSLATIONS[I18n.lang] || {};
      var str = dict[key] != null ? dict[key] : (window.TRANSLATIONS.en[key] != null ? window.TRANSLATIONS.en[key] : key);
      if (vars) Object.keys(vars).forEach(function (k) { str = str.split("{" + k + "}").join(vars[k]); });
      return str;
    },

    /** Pick the current-language value from an {en,it,bn,ar} object. */
    pick: function (obj) { return obj ? (obj[I18n.lang] || obj.en) : ""; },

    formatPrice: function (amount, currency) {
      return new Intl.NumberFormat(LOCALES[I18n.lang], { style: "currency", currency: currency || window.SITE_CONFIG.currency, maximumFractionDigits: 0 }).format(amount);
    },

    onChange: function (fn) { I18n.listeners.push(fn); },

    apply: function (lang) {
      if (SUPPORTED.indexOf(lang) === -1) lang = "en";
      I18n.lang = lang;
      var root = document.documentElement;
      root.lang = lang;
      root.dir = RTL.indexOf(lang) > -1 ? "rtl" : "ltr";
      try { sessionStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }

      document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = I18n.t(el.getAttribute("data-i18n")); });
      document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = I18n.t(el.getAttribute("data-i18n-html")); });
      document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", I18n.t(el.getAttribute("data-i18n-aria"))); });
      document.querySelectorAll("[data-config]").forEach(function (el) {
        var v = window.SITE_CONFIG[el.getAttribute("data-config")];
        el.textContent = typeof v === "object" ? I18n.pick(v) : v;
      });
      document.querySelectorAll("[data-lang-current]").forEach(function (el) { el.textContent = I18n.t("meta.lang"); });
      document.querySelectorAll("[data-lang-option]").forEach(function (btn) { btn.setAttribute("aria-checked", String(btn.getAttribute("data-lang-option") === lang)); });

      I18n.listeners.forEach(function (fn) { fn(lang); });
    },
  };

  function initSwitchers() {
    document.querySelectorAll("[data-lang]").forEach(function (wrap) {
      var btn = wrap.querySelector(".lang__btn");
      var close = function () { wrap.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); };
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = !wrap.classList.contains("is-open");
        document.querySelectorAll("[data-lang].is-open").forEach(function (w) { w.classList.remove("is-open"); });
        wrap.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
      });
      wrap.querySelectorAll("[data-lang-option]").forEach(function (opt) {
        opt.addEventListener("click", function () { I18n.apply(opt.getAttribute("data-lang-option")); close(); btn.focus(); });
      });
      wrap.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); btn.focus(); } });
      document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) close(); });
    });
  }

  window.I18n = I18n;

  document.addEventListener("DOMContentLoaded", function () {
    initSwitchers();
    // Apply after all other scripts registered their listeners.
    setTimeout(function () { I18n.apply(readStored() || document.documentElement.getAttribute("data-default-lang") || "en"); }, 0);
  });
})();
