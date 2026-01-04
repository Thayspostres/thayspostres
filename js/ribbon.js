(() => {
  const root = document.querySelector("[data-ribbon]");
  if (!root) return;

  const track = root.querySelector("[data-ribbon-track]");
  const prev = root.querySelector("[data-ribbon-prev]");
  const next = root.querySelector("[data-ribbon-next]");
  if (!track) return;

  function scrollByCard(dir){
    reminder();
    const first = track.querySelector(".ritem");
    const step = first ? (first.getBoundingClientRect().width + 12) : 260;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function reminder(){
    // no-op; keeps file future-proof
  }

  if (prev) prev.addEventListener("click", () => scrollByCard(-1));
  if (next) next.addEventListener("click", () => scrollByCard(1));
})();
