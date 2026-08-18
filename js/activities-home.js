/* Renders the 3 latest activities on the homepage. */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("homeActivities");
    if (!host) return;
    var isMs = document.body.classList.contains("lang-ms");
    var items = (window.BDE_ACTIVITIES || []).slice(0, 3);

    host.innerHTML = items.map(function (a) {
      return (
        '<article class="activity-card">' +
          '<div class="activity-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M4 12h16M4 18h10"/></svg></div>' +
          '<div class="activity-body">' +
            '<div class="activity-meta"><span>' + a.date + '</span><span>' +
              '<span class="i18n-en"' + (isMs ? " hidden" : "") + '>' + a.tag_en + '</span>' +
              '<span class="i18n-ms"' + (isMs ? "" : " hidden") + '>' + a.tag_ms + '</span>' +
            '</span></div>' +
            '<h3>' +
              '<span class="i18n-en"' + (isMs ? " hidden" : "") + '>' + a.title_en + '</span>' +
              '<span class="i18n-ms"' + (isMs ? "" : " hidden") + '>' + a.title_ms + '</span>' +
            '</h3>' +
            '<p>' +
              '<span class="i18n-en"' + (isMs ? " hidden" : "") + '>' + a.excerpt_en + '</span>' +
              '<span class="i18n-ms"' + (isMs ? "" : " hidden") + '>' + a.excerpt_ms + '</span>' +
            '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  });
})();
