/* Thays Postres - main.js (SAFE + CONNECTED) */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const STORAGE_KEY = "tp_theme";
  const DEFAULT_THEME = document.documentElement.getAttribute("data-theme") || "dark";

  function setTheme(theme) {
    const t = (theme === "light" || theme === "dark") ? theme : DEFAULT_THEME;
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch (_) {}
    const btn = $("[data-theme-toggle]");
    if (btn) btn.setAttribute("aria-label", t === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    setTheme(saved || DEFAULT_THEME);
    const btn = $("[data-theme-toggle]");
    if (btn) btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || DEFAULT_THEME;
      setTheme(cur === "dark" ? "light" : "dark");
    });
  }

  function initNav() {
    const nav = $(".nav");
    const toggle = $(".nav-toggle");
    if (!nav || !toggle) return;

    const open = () => { nav.classList.add("is-open"); toggle.setAttribute("aria-expanded","true"); };
    const close = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded","false"); };
    const isOpen = () => nav.classList.contains("is-open");

    toggle.addEventListener("click", (e) => { e.preventDefault(); isOpen() ? close() : open(); });

    document.addEventListener("click", (e) => {
      if (!isOpen()) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (nav.contains(t) || toggle.contains(t)) return;
      close();
    });

    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    $$(".nav a.nav-link").forEach((a) => a.addEventListener("click", () => close()));
  }

  function initActiveNav() {
    const path = (location.pathname || "/").split("/").pop() || "index.html";
    $$(".nav-link[href]").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("#")[0];
      const file = href.split("/").pop();
      const match =
        (path === "" && (file === "" || file === "index.html")) ||
        (file && file.toLowerCase() === path.toLowerCase());
      if (match) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      } else {
        a.classList.remove("is-active");
        a.removeAttribute("aria-current");
      }
    });
  }

  function initYear() {
    const y = document.querySelector("[data-year]");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initMapLinks() {
    const address = document.documentElement.getAttribute("data-address") || "Thays Postres, Navojoa, Sonora";
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
    $$("[data-map-link]").forEach((el) => {
      if (el instanceof HTMLAnchorElement) {
        el.href = mapsUrl;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    });
  }

  function initWhatsAppLinks() {
    const phone = document.documentElement.getAttribute("data-wa-phone") || "526421610757";
    const defaultMsg = document.documentElement.getAttribute("data-wa-msg") || "Hola Thays Postres, quiero hacer un pedido 🙌";
    const waBase = "https://wa.me/" + encodeURIComponent(phone) + "?text=" + encodeURIComponent(defaultMsg);

    $$("a[data-wa-link]").forEach((a) => {
      if (!(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute("href") || "";
      if (!href || href === "#") a.href = waBase;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initActiveNav();
    initYear();
    initMapLinks();
    initWhatsAppLinks();
  });
})();