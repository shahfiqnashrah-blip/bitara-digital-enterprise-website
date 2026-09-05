/* ==========================================================================
   Bitara Digital Enterprise — shared behavior
   Language: twin-element bilingual pattern. Every translatable node has an
   English version (class="i18n-en") shown by default (no-JS safe) and a
   Bahasa Malaysia twin (class="i18n-ms", hidden) shown when toggled. Body
   gets .lang-en/.lang-ms and CSS does the actual show/hide.
   ========================================================================== */
(function () {
  "use strict";

  var LANG_KEY = "bde-lang";

  function applyLang(lang) {
    var isMs = lang === "ms";
    document.body.classList.remove("lang-en", "lang-ms");
    document.body.classList.add(isMs ? "lang-ms" : "lang-en");
    document.documentElement.setAttribute("lang", isMs ? "ms" : "en");
    document.querySelectorAll(".i18n-en").forEach(function (el) { el.hidden = isMs; });
    document.querySelectorAll(".i18n-ms").forEach(function (el) { el.hidden = !isMs; });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
    });
  }

  function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(LANG_KEY); } catch (e) {}
    applyLang(stored || "en");

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.dataset.lang;
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
        applyLang(lang);
      });
    });
  }

  function initMobileMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  function initWhatsApp() {
    var cfg = window.BDE_CONFIG || {};
    var links = document.querySelectorAll("[data-wa-link]");
    links.forEach(function (a) {
      var msg = a.getAttribute("data-wa-message") || "Hi Bitara Digital Enterprise, I'd like to enquire about your services.";
      a.href = "https://wa.me/" + (cfg.whatsappNumber || "") + "?text=" + encodeURIComponent(msg);
    });
    document.querySelectorAll("[data-wa-display]").forEach(function (el) {
      el.textContent = cfg.whatsappDisplay || "";
    });
    document.querySelectorAll("[data-email-link]").forEach(function (a) {
      a.href = "mailto:" + (cfg.email || "");
    });
    document.querySelectorAll("[data-email-display]").forEach(function (el) {
      el.textContent = cfg.email || "";
    });
    document.querySelectorAll("[data-location-display]").forEach(function (el) {
      el.textContent = cfg.location || "";
    });
    document.querySelectorAll("[data-social-linkedin]").forEach(function (a) { a.href = cfg.social && cfg.social.linkedin || "#"; });
    document.querySelectorAll("[data-social-instagram]").forEach(function (a) { a.href = cfg.social && cfg.social.instagram || "#"; });
    document.querySelectorAll("[data-social-facebook]").forEach(function (a) { a.href = cfg.social && cfg.social.facebook || "#"; });
    document.querySelectorAll("[data-social-tiktok]").forEach(function (a) { a.href = cfg.social && cfg.social.tiktok || "#"; });
  }

  function initFounder() {
    var f = (window.BDE_CONFIG || {}).founder;
    if (!f) return;
    document.querySelectorAll("[data-founder-name]").forEach(function (el) { el.textContent = f.name; });
    document.querySelectorAll("[data-founder-role-en]").forEach(function (el) { el.textContent = f.role_en; });
    document.querySelectorAll("[data-founder-role-ms]").forEach(function (el) { el.textContent = f.role_ms; });
    document.querySelectorAll("[data-founder-bg-en]").forEach(function (el) { el.textContent = f.background_en; });
    document.querySelectorAll("[data-founder-bg-ms]").forEach(function (el) { el.textContent = f.background_ms; });
  }

  function initTermTabs() {
    var wrap = document.querySelector(".term");
    if (!wrap) return;
    var tabs = wrap.querySelectorAll(".term-tabs button");
    var panels = wrap.querySelectorAll(".term-panel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        panels.forEach(function (p) { p.classList.remove("active"); });
        tab.setAttribute("aria-selected", "true");
        var target = wrap.querySelector('.term-panel[data-panel="' + tab.dataset.tab + '"]');
        if (target) target.classList.add("active");
      });
    });

    // Auto-rotate between the two panels to show both without user action,
    // pausing on hover/focus and respecting reduced-motion.
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || tabs.length < 2) return;
    var idx = 0;
    var timer = setInterval(function () {
      idx = (idx + 1) % tabs.length;
      tabs[idx].click();
    }, 4200);
    wrap.addEventListener("mouseenter", function () { clearInterval(timer); });
    wrap.addEventListener("focusin", function () { clearInterval(timer); });
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function validateField(field) {
    var input = field.querySelector("input, select, textarea");
    if (!input) return true;
    var valid = input.checkValidity();
    field.classList.toggle("invalid", !valid);
    return valid;
  }

  function initForms() {
    var cfg = window.BDE_CONFIG || {};
    document.querySelectorAll("form[data-enquiry-form]").forEach(function (form) {

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fields = form.querySelectorAll(".field");
        var allValid = true;
        fields.forEach(function (f) { if (!validateField(f)) allValid = false; });

        var status = form.querySelector(".form-status");
        if (!allValid) {
          if (status) {
            status.textContent = form.dataset.errValidation || "Please fill in the required fields correctly.";
            status.className = "form-status show error";
          }
          return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalLabel = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = form.dataset.sending || "Sending..."; }

        var sheetsUrl = cfg.googleSheetsFormUrl;
        var isPlaceholderUrl = !sheetsUrl || sheetsUrl === "YOUR_APPS_SCRIPT_WEB_APP_URL";

        var finish = function (ok) {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
          if (status) {
            status.textContent = ok
              ? (form.dataset.success || "Thanks — your enquiry has been sent. We'll reply within 1-2 business days.")
              : (form.dataset.error || "Something went wrong sending this. Please try WhatsApp instead.");
            status.className = "form-status show " + (ok ? "success" : "error");
          }
          if (ok) form.reset();
        };

        if (isPlaceholderUrl) {
          // No live Google Sheets Web App URL configured yet — surface this clearly
          // instead of failing silently. See GOOGLE_SHEETS_SETUP.md.
          console.warn("BDE: googleSheetsFormUrl is still a placeholder in js/config.js — form will not actually send.");
          if (status) {
            status.textContent = "Enquiry form isn't fully wired up yet — please use the WhatsApp button below for now.";
            status.className = "form-status show error";
          }
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
          return;
        }

        // Sent as FormData (not JSON) so the browser skips a CORS preflight —
        // Apps Script Web Apps don't answer OPTIONS requests. doPost(e) reads
        // these straight off e.parameter.
        fetch(sheetsUrl, { method: "POST", body: new FormData(form) })
          .then(function (res) { return res.json(); })
          .then(function (data) { finish(!!data && data.result === "success"); })
          .catch(function () { finish(false); });
      });

      form.querySelectorAll(".field input, .field select, .field textarea").forEach(function (input) {
        input.addEventListener("blur", function () { validateField(input.closest(".field")); });
      });
    });
  }

  // Small email-gated CTAs (e.g. "get the course outline") — reuses the same
  // Google Sheets endpoint as the main contact form, tagged via data-lead-type
  // so submissions are easy to tell apart in the sheet.
  function initLeadForms() {
    var cfg = window.BDE_CONFIG || {};
    document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
      var status = form.querySelector(".lead-status");
      var emailInput = form.querySelector('input[type="email"]');

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!emailInput.checkValidity()) {
          emailInput.classList.add("invalid");
          if (status) {
            status.textContent = "Please enter a valid email. / Sila masukkan e-mel yang sah.";
            status.className = "lead-status show error";
          }
          return;
        }
        emailInput.classList.remove("invalid");

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalLabel = submitBtn.innerHTML;
        submitBtn.disabled = true;

        var sheetsUrl = cfg.googleSheetsFormUrl;
        var isPlaceholderUrl = !sheetsUrl || sheetsUrl === "YOUR_APPS_SCRIPT_WEB_APP_URL";

        var finish = function (ok) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
          if (status) {
            status.textContent = ok
              ? (form.dataset.success || "Thanks — check your inbox shortly.")
              : (form.dataset.error || "Something went wrong. Please try WhatsApp instead.");
            status.className = "lead-status show " + (ok ? "success" : "error");
          }
          if (ok) form.reset();
        };

        if (isPlaceholderUrl) {
          console.warn("BDE: googleSheetsFormUrl is still a placeholder — lead form will not actually send.");
          if (status) {
            status.textContent = "Not wired up yet — please WhatsApp us instead.";
            status.className = "lead-status show error";
          }
          submitBtn.disabled = false;
          return;
        }

        var fd = new FormData();
        fd.append("name", "Lead capture");
        fd.append("email", emailInput.value);
        fd.append("service", form.dataset.leadType || "Lead capture");
        fd.append("message", "Requested via training page: " + (form.dataset.leadType || "lead capture") + ".");

        fetch(sheetsUrl, { method: "POST", body: fd })
          .then(function (res) { return res.json(); })
          .then(function (data) { finish(!!data && data.result === "success"); })
          .catch(function () { finish(false); });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initMobileMenu();
    initReveal();
    initWhatsApp();
    initFounder();
    initTermTabs();
    initYear();
    initForms();
    initLeadForms();
  });
})();
