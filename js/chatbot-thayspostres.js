/* Thays Postres - chatbot-thayspostres.js (LOCAL) */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  function buildWAUrl(message) {
    const phone = document.documentElement.getAttribute("data-wa-phone") || "526421610757";
    const msg = message || "Hola Thays Postres, quiero hacer un pedido 🙌";
    return "https://wa.me/" + encodeURIComponent(phone) + "?text=" + encodeURIComponent(msg);
  }

  function ensureChatUI() {
    let btn = $("#tpChatBtn");
    let panel = $("#tpChat");

    if (!btn) {
      btn = document.createElement("button");
      btn.id = "tpChatBtn";
      btn.type = "button";
      btn.className = "tp-chat-btn";
      btn.setAttribute("aria-label", "Abrir chat");
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c5 0 9 3.58 9 8s-4 8-9 8c-1.02 0-2.01-.13-2.95-.38L5 21l1.7-3.42C5.01 16.25 3 14.25 3 11c0-4.42 4-8 9-8Zm-3 7h6v2H9v-2Zm0 4h4v2H9v-2Z"/></svg>';
      document.body.appendChild(btn);
    }

    if (!panel) {
      panel = document.createElement("div");
      panel.id = "tpChat";
      panel.className = "tp-chat";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "false");
      panel.innerHTML = `
        <div class="tp-chat-head">
          <div class="tp-chat-title">Asistente Thays</div>
          <button class="tp-chat-close" type="button" aria-label="Cerrar">×</button>
        </div>
        <div class="tp-chat-body">
          <div class="tp-chat-bubble is-bot">Hola 👋 ¿Qué te gustaría hacer?</div>
          <div class="tp-chat-chips">
            <button type="button" class="tp-chip" data-msg="Hola Thays Postres, quiero cotizar un pastel 🎂">Cotizar pastel</button>
            <button type="button" class="tp-chip" data-msg="Hola Thays Postres, ¿qué postres tienes disponibles hoy? 🍰">Disponibles hoy</button>
            <button type="button" class="tp-chip" data-msg="Hola Thays Postres, quiero un pedido personalizado ✨">Personalizado</button>
            <button type="button" class="tp-chip" data-msg="Hola Thays Postres, ¿haces entregas a domicilio? 🚗">Entregas</button>
          </div>
          <div class="tp-chat-note">Al tocar una opción te manda a WhatsApp con el mensaje listo ✅</div>
        </div>
        <div class="tp-chat-foot">
          <a class="btn btn-primary tp-chat-wa" data-wa-link href="#">Abrir WhatsApp</a>
        </div>`;
      document.body.appendChild(panel);
    }

    return { btn, panel };
  }

  function init() {
    const { btn, panel } = ensureChatUI();
    const closeBtn = $(".tp-chat-close", panel);

    const open = () => panel.classList.add("is-open");
    const close = () => panel.classList.remove("is-open");
    const toggle = () => panel.classList.toggle("is-open");

    btn.addEventListener("click", toggle);
    if (closeBtn) closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    $$("[data-open-assistant]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); open(); }));

    const waBtn = $(".tp-chat-wa", panel);
    if (waBtn) { waBtn.href = buildWAUrl(); waBtn.target="_blank"; waBtn.rel="noopener noreferrer"; }

    $$(".tp-chip", panel).forEach((c) => c.addEventListener("click", () => {
      const msg = c.getAttribute("data-msg") || "";
      window.open(buildWAUrl(msg), "_blank", "noopener,noreferrer");
    }));
  }

  document.addEventListener("DOMContentLoaded", init);
})();