/* ==========================================================================
   App — renders demo content from data.js into the Blade <template> partials,
   runs flight filters and the contact form validation.

   Future Laravel: cards can be rendered server-side with @foreach instead;
   keep the data-* attributes so the modals & filters keep working.
   ========================================================================== */
(function () {
  "use strict";

  var ARROW = '<svg aria-hidden="true"><use href="#i-arrow"></use></svg>';
  var state = { type: "all", dest: "all" };
  // Deep link support: flights?dest=DXB
  var q = new URLSearchParams(location.search).get("dest");
  if (q && window.CITIES[q]) state.dest = q;

  function city(code) { return I18n.pick(window.CITIES[code]); }
  function country(code) { return I18n.pick(window.CITIES[code].country); }
  function tpl(id) { var t = document.getElementById(id); return t ? t.content.firstElementChild.cloneNode(true) : null; }
  function slot(el, name) { return el.querySelector('[data-slot="' + name + '"]'); }
  function setText(el, name, value) { var s = slot(el, name); if (s) s.textContent = value; }
  function tripLabel(f) { return I18n.t(f.type === "round" ? "card.round" : "card.oneway"); }

  /* ---------- Flights ---------- */
  function renderFlights() {
    document.querySelectorAll("[data-flights]").forEach(function (grid) {
      var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
      var list = limit ? window.FLIGHTS.slice(0, limit) : window.FLIGHTS;
      grid.innerHTML = "";
      list.forEach(function (f) {
        var card = tpl("tpl-flight-card");
        var al = window.AIRLINES[f.airline];
        card.dataset.type = f.type;
        card.dataset.dest = f.to;
        var logo = slot(card, "logo"); logo.textContent = f.airline; logo.classList.add(al.tone);
        setText(card, "airline", al.name);
        var tag = slot(card, "label");
        if (f.label) { tag.textContent = I18n.t(f.label); tag.classList.add(f.label === "label.limited" ? "tag--coral" : f.label === "label.new" ? "tag--sky" : "tag--gold"); }
        else tag.remove();
        setText(card, "fromCode", window.CITIES[f.from].code);
        setText(card, "fromCity", city(f.from));
        setText(card, "toCode", window.CITIES[f.to].code);
        setText(card, "toCity", city(f.to));
        setText(card, "type", tripLabel(f));
        setText(card, "note", I18n.t(f.note));
        setText(card, "fromLabel", I18n.t("card.from"));
        setText(card, "price", I18n.formatPrice(f.price));
        setText(card, "pp", I18n.t("card.pp"));
        setText(card, "cta", I18n.t("card.enquire"));
        card.setAttribute("aria-label", I18n.t("card.enquire") + ": " + city(f.from) + " → " + city(f.to) + ", " + tripLabel(f) + ", " + I18n.formatPrice(f.price));
        card.addEventListener("click", function () { window.openFlightModal(f.id); });
        grid.appendChild(card);
      });
    });
    applyFilters(false);
  }

  function fillDestinationSelect() {
    var sel = document.querySelector("[data-filter-dest]");
    if (!sel) return;
    var seen = {};
    sel.innerHTML = "";
    var all = document.createElement("option"); all.value = "all"; all.textContent = I18n.t("filter.anyDest"); sel.appendChild(all);
    window.FLIGHTS.forEach(function (f) {
      if (seen[f.to]) return; seen[f.to] = 1;
      var o = document.createElement("option"); o.value = f.to; o.textContent = city(f.to);
      sel.appendChild(o);
    });
    sel.value = state.dest;
  }

  function applyFilters(animate) {
    var grid = document.querySelector("[data-flights][data-filterable]");
    if (!grid) return;
    var shown = 0;
    grid.querySelectorAll(".flight-card").forEach(function (card) {
      var ok = (state.type === "all" || card.dataset.type === state.type) && (state.dest === "all" || card.dataset.dest === state.dest);
      card.classList.toggle("is-hidden", !ok);
      card.classList.remove("is-entering");
      if (ok) { shown++; if (animate) { void card.offsetWidth; card.classList.add("is-entering"); } }
    });
    var empty = document.querySelector("[data-flights-empty]");
    if (empty) empty.classList.toggle("is-visible", shown === 0);
  }

  function initFilters() {
    document.querySelectorAll("[data-filter-type]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.type = chip.getAttribute("data-filter-type");
        document.querySelectorAll("[data-filter-type]").forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        applyFilters(true);
      });
    });
    var sel = document.querySelector("[data-filter-dest]");
    if (sel) sel.addEventListener("change", function () { state.dest = sel.value; applyFilters(true); });
  }

  /* ---------- Destinations ---------- */
  function renderDestinations() {
    document.querySelectorAll("[data-destinations]").forEach(function (grid) {
      var base = grid.getAttribute("data-img-base") || "assets/images/";
      grid.innerHTML = "";
      window.DESTINATIONS.forEach(function (d) {
        var card = tpl("tpl-destination-card");
        var img = slot(card, "img"); img.src = base + d.image; img.alt = city(d.city) + ", " + country(d.city);
        setText(card, "country", country(d.city));
        setText(card, "name", city(d.city));
        setText(card, "desc", I18n.pick(d.desc));
        slot(card, "cta").innerHTML = "<span>" + I18n.t("dest.cta") + "</span>" + ARROW;
        card.addEventListener("click", function () {
          window.open(Contact.whatsapp(window.SITE_CONFIG.whatsapp, I18n.t("msg.dest", { city: city(d.city) })), "_blank", "noopener");
        });
        grid.appendChild(card);
      });
      if (window.observeReveals) window.observeReveals(grid);
    });
  }

  /* ---------- Branches ---------- */
  function renderBranches() {
    document.querySelectorAll("[data-branches]").forEach(function (grid) {
      var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
      var list = limit ? window.BRANCHES.slice(0, limit) : window.BRANCHES;
      grid.innerHTML = "";
      list.forEach(function (b) {
        var card = tpl("tpl-branch-card");
        slot(card, "pin").classList.add(b.tone);
        setText(card, "maplabel", I18n.t("branch.map"));
        setText(card, "city", city(b.city) + " · " + country(b.city));
        setText(card, "name", b.name);
        setText(card, "address", b.address);
        setText(card, "phone", b.phone);
        setText(card, "email", b.email);
        setText(card, "hours", I18n.pick(b.hours));
        setText(card, "cta", I18n.t("branch.contact"));
        card.setAttribute("aria-label", I18n.t("branch.contact") + ": " + b.name);
        card.addEventListener("click", function () { window.openBranchModal(b.id); });
        grid.appendChild(card);
      });
    });
  }

  /* ---------- Featured fare (hero) & general contact links ---------- */
  function renderGeneral() {
    var cfg = window.SITE_CONFIG;
    var hero = document.querySelector("[data-hero-fare]");
    if (hero) {
      var f = window.FLIGHTS[0];
      setText(hero, "route", city(f.from) + " → " + city(f.to));
      setText(hero, "codes", window.CITIES[f.from].code + " — " + window.CITIES[f.to].code);
      setText(hero, "price", I18n.formatPrice(f.price));
      setText(hero, "airline", window.AIRLINES[f.airline].name + " · " + tripLabel(f));
      hero.onclick = function () { window.openFlightModal(f.id); };
    }
    var general = I18n.t("msg.branch", { branch: cfg.company });
    document.querySelectorAll("[data-contact=whatsapp]").forEach(function (a) { a.href = Contact.whatsapp(cfg.whatsapp, general); a.target = "_blank"; a.rel = "noopener"; });
    document.querySelectorAll("[data-contact=phone]").forEach(function (a) { a.href = Contact.tel(cfg.phone); });
    document.querySelectorAll("[data-contact=email]").forEach(function (a) { a.href = Contact.mail(cfg.email, cfg.company, general); });
    var y = document.querySelector("[data-year]"); if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Contact form (frontend-only validation) ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var success = document.querySelector("[data-form-success]");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validateField(input) {
      var field = input.closest(".field");
      var err = field.querySelector(".field__error");
      var v = input.value.trim();
      var msg = "";
      if (input.required && !v) msg = I18n.t("err.required");
      else if (input.type === "email" && v && !emailRe.test(v)) msg = I18n.t("err.email");
      field.classList.toggle("has-error", !!msg);
      input.setAttribute("aria-invalid", String(!!msg));
      err.textContent = msg;
      return !msg;
    }

    form.querySelectorAll("input, textarea").forEach(function (i) {
      i.addEventListener("blur", function () { if (i.value) validateField(i); });
      i.addEventListener("input", function () { if (i.closest(".field").classList.contains("has-error")) validateField(i); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      form.querySelectorAll("input, textarea").forEach(function (i) { if (!validateField(i) && !firstBad) firstBad = i; });
      if (firstBad) { firstBad.focus(); return; }
      // Future Laravel: POST to route('contact.store') with @csrf.
      form.hidden = true;
      success.classList.add("is-visible");
      success.querySelector("h3").focus();
    });

    document.querySelector("[data-form-again]").addEventListener("click", function () {
      form.reset(); form.hidden = false; success.classList.remove("is-visible");
      form.querySelector("input").focus();
    });

    I18n.onChange(function () { form.querySelectorAll(".field.has-error input, .field.has-error textarea").forEach(validateField); });
  }

  /* Re-render dynamic content whenever the language changes (incl. first load). */
  I18n.onChange(function () {
    fillDestinationSelect();
    renderFlights();
    renderDestinations();
    renderBranches();
    renderGeneral();
  });

  document.addEventListener("DOMContentLoaded", function () { initFilters(); initForm(); });
})();
