/* ==========================================================================
   Shared modal controller + flight enquiry modal.
   Contact-only: WhatsApp (wa.me), tel: and mailto: links. No payment.
   ========================================================================== */
(function () {
  "use strict";

  var lastFocus = null;

  var Modal = {
    open: function (id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      lastFocus = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      setTimeout(function () { var f = modal.querySelector(".modal__close"); if (f) f.focus(); }, 60);
    },
    close: function (modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      if (lastFocus) lastFocus.focus();
    },
  };

  var Contact = {
    digits: function (s) { return String(s).replace(/\D/g, ""); },
    tel: function (s) { return "tel:+" + Contact.digits(s); },
    whatsapp: function (number, text) { return "https://wa.me/" + Contact.digits(number) + "?text=" + encodeURIComponent(text); },
    mail: function (email, subject, body) { return "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body); },
  };

  window.Modal = Modal;
  window.Contact = Contact;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".modal").forEach(function (modal) {
      modal.querySelectorAll("[data-modal-close]").forEach(function (b) { b.addEventListener("click", function () { Modal.close(modal); }); });
      modal.addEventListener("keydown", function (e) {
        if (e.key === "Escape") Modal.close(modal);
        if (e.key !== "Tab") return;
        var f = modal.querySelectorAll("a[href], button:not([disabled])");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    });
  });

  /* ---------- Flight enquiry ---------- */
  var current = null;
  function cityName(code) { return I18n.pick(window.CITIES[code]); }

  function fill() {
    if (!current) return;
    var f = current;
    var modal = document.getElementById("flight-modal");
    var route = cityName(f.from) + " (" + window.CITIES[f.from].code + ") → " + cityName(f.to) + " (" + window.CITIES[f.to].code + ")";
    var airline = window.AIRLINES[f.airline].name;
    var type = I18n.t(f.type === "round" ? "card.round" : "card.oneway");
    var price = I18n.formatPrice(f.price);
    var cfg = window.SITE_CONFIG;
    var msg = I18n.t("msg.flight", { route: route, airline: airline, price: price, type: type.toLowerCase() });

    modal.querySelector("[data-f=title]").textContent = cityName(f.from) + " → " + cityName(f.to);
    modal.querySelector("[data-f=route]").textContent = route;
    modal.querySelector("[data-f=airline]").textContent = airline;
    modal.querySelector("[data-f=type]").textContent = type;
    modal.querySelector("[data-f=price]").textContent = price;
    modal.querySelector("[data-f=whatsapp]").href = Contact.whatsapp(cfg.whatsapp, msg);
    modal.querySelector("[data-f=call]").href = Contact.tel(cfg.phone);
    modal.querySelector("[data-f=mail]").href = Contact.mail(cfg.email, I18n.t("msg.subject", { route: route }), msg);
  }

  window.openFlightModal = function (id) {
    current = window.FLIGHTS.find(function (x) { return x.id === id; });
    if (!current) return;
    fill();
    Modal.open("flight-modal");
  };

  I18n.onChange(fill);
})();
