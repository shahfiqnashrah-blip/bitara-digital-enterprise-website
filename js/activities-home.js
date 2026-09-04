/* Renders the 3 latest activities on the homepage. */
(function () {
  "use strict";

  var CATEGORY_ICON = {
    training: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="3"/>',
    development: '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6.5l-3 11"/>',
    announcement: '<path d="M4 6h16M4 12h16M4 18h10"/>'
  };

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("homeActivities");
    if (!host) return;
    var isMs = document.body.classList.contains("lang-ms");
    var items = (window.BDE_ACTIVITIES || []).slice(0, 3);

    host.innerHTML = items.map(function (a) {
      var thumb = a.image
        ? '<img src="' + a.image + '" alt="" loading="lazy">'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (CATEGORY_ICON[a.category] || CATEGORY_ICON.announcement) + '</svg>';
      var href = a.link || "#";
      return (
        '<article class="activity-card">' +
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
  });
})();
