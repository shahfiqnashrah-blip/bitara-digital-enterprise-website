/* Pre-selects the "enquiring about" dropdown from a ?service= query param,
   e.g. contact.html?service=development or ?service=training */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var service = params.get("service");
    if (!service) return;
    var select = document.getElementById("f-service");
    if (!select) return;
    var map = {
      development: "Web Development",
      training: "Generative AI Intensive",
      collab: "Trainer Collaboration",
      ebook: "E-Book / Ebook Order"
    };
    var value = map[service];
    if (value) select.value = value;
  });
})();
