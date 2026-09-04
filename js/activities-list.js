/* Renders the full, filterable activities list on activities.html */
(function () {
  "use strict";

  var CATEGORY_ICON = {
    training: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="3"/>',
    development: '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6.5l-3 11"/>',
    announcement: '<path d="M4 6h16M4 12h16M4 18h10"/>'
  };

  function render(activeFilter) {
    var host = document.getElementById("activitiesList");
    var empty = document.getElementById("activitiesEmpty");
    if (!host) return;
    var isMs = document.body.classList.contains("lang-ms");
    var items = (window.BDE_ACTIVITIES || []).filter(function (a) {
      return activeFilter === "all" || a.category === activeFilter;
    });

    empty.style.display = items.length ? "none" : "block";

    host.innerHTML = items.map(function (a) {
      var thumb = a.image
        ? '<img src="' + a.image + '" alt="" loading="lazy">'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (CATEGORY_ICON[a.category] || CATEGORY_ICON.announcement) + '</svg>';
      var href = a.link || "#";
      return (
        '<article class="activity-card" data-reveal>' +
          '<a href="' + href + '" class="activity-thumb" aria-hidden="true" tabindex="-1">' + thumb + '</a>' +
          '<div class="activity-body">' +
            '<div class="activity-meta"><span>' + a.date + '</span><span>' +
              '<span class="i18n-en"' + (isMs ? " hidden" : "") + '>' + a.tag_en + '</span>' +
              '<span class="i18n-ms"' + (isMs ? "" : " hidden") + '>' + a.tag_ms + '</span>' +
            '</span></div>' +
            '<h3><a href="' + href + '" style="color:inherit">' +
              '<span class="i18n-en"' + (isMs ? " hidden" : "") + '>' + a.title_en + '</span>' +
              '<span class="i18n-ms"' + (isMs ? "" : " hidden") + '>' + a.title_ms + '</span>' +
            '</a></h3>' +
            '<p>' +
              '<span class="i18n-en"' + (isMs ? " hidden" : "") + '>' + a.excerpt_en + '</span>' +
              '<span class="i18n-ms"' + (isMs ? "" : " hidden") + '>' + a.excerpt_ms + '</span>' +
            '</p>' +
            '<a class="card-link" href="' + href + '">' +
              '<span class="i18n-en"' + (isMs ? " hidden" : "") + '>Read the story</span>' +
              '<span class="i18n-ms"' + (isMs ? "" : " hidden") + '>Baca kisah penuh</span>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
            '</a>' +
          '</div>' +
        '</article>'
      );
    }).join("");

    // Reveal-on-scroll init (main.js already ran its own pass at DOMContentLoaded,
    // so newly injected cards need to be shown immediately rather than staying invisible).
    host.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("in-view"); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var chips = document.querySelectorAll(".filter-chip");
    render("all");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        render(chip.dataset.filter);
      });
    });

    // Re-render on language toggle so injected cards follow the new language too.
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var active = document.querySelector(".filter-chip[aria-pressed=\"true\"]");
        render(active ? active.dataset.filter : "all");
      });
    });
  });
})();
