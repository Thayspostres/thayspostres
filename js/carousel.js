(() => {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-carousel-track]");
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  const dotsWrap = root.querySelector("[data-carousel-dots]");

  if (!track) return;

  const slides = Array.from(track.children || []).filter(el => el && el.classList && el.classList.contains("slide"));
  if (!slides.length) return;

  let index = 0;
  let timer = null;
  const autoplayMs = parseInt(root.getAttribute("data-autoplay-ms") || "6500", 10);
  const canAutoplay = root.getAttribute("data-autoplay") !== "false";

  function clamp(i) {
    const n = slides.length;
    return (i % n + n) % n;
  }

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;
    if (dotsWrap) {
      const dots = dotsWrap.querySelectorAll(".dot");
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
  }

  function go(i) {
    index = clamp(i);
    update();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dot" + (i === 0 ? " is-active" : "");
      b.setAttribute("aria-label", `Ir a la tarjeta ${i + 1}`);
      b.addEventListener("click", () => { go(i); restartAutoplay(); });
      dotsWrap.appendChild(b);
    });
  }

  function clearAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function startAutoplay() {
    if (!canAutoplay) return;
    if (!Number.isFinite(autoplayMs) || autoplayMs < 2000) return;
    clearAutoplay();
    timer = setInterval(() => next(), autoplayMs);
  }

  function restartAutoplay() {
    clearAutoplay();
    startAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restartAutoplay(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restartAutoplay(); });

  // Pause on hover (desktop)
  root.addEventListener("mouseenter", () => clearAutoplay());
  root.addEventListener("mouseleave", () => startAutoplay());

  buildDots();
  update();
  startAutoplay();
})();
