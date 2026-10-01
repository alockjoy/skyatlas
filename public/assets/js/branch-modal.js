/* ==========================================================================
   Branch-specific contact modal — every branch opens its own details.
   ========================================================================== */
(function () {
  "use strict";

  var current = null;

  function fill() {
    if (!current) return;
    var b = current;
    var modal = document.getElementById("branch-modal");
    var msg = I18n.t("msg.branch", { branch: b.name });
    modal.querySelector("[data-b=title]").textContent = b.name;
    modal.querySelector("[data-b=city]").textContent = I18n.pick(window.CITIES[b.city]) + ", " + I18n.pick(window.CITIES[b.city].country);
    modal.querySelector("[data-b=address]").textContent = b.address;
    modal.querySelector("[data-b=phone]").textContent = b.phone;
    modal.querySelector("[data-b=email]").textContent = b.email;
    modal.querySelector("[data-b=hours]").textContent = I18n.pick(b.hours);
    modal.querySelector("[data-b=whatsapp]").href = Contact.whatsapp(b.whatsapp, msg);
    modal.querySelector("[data-b=call]").href = Contact.tel(b.phone);
    modal.querySelector("[data-b=mail]").href = Contact.mail(b.email, b.name, msg);
  }

  window.openBranchModal = function (id) {
    current = window.BRANCHES.find(function (x) { return x.id === id; });
    if (!current) return;
    fill();
    Modal.open("branch-modal");
  };

  I18n.onChange(fill);
})();
