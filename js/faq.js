(() => {
  const items = Array.from(document.querySelectorAll("[data-qa]") || []);
  if (!items.length) return;

  items.forEach((qa) => {
    const btn = qa.querySelector("button");
    const ans = qa.querySelector(".a");
    if (!btn || !ans) return;

    btn.addEventListener("click", () => {
      const isOpen = qa.classList.contains("is-open");
      // close others (accordion)
      items.forEach(i => i.classList.remove("is-open"));
      if (!isOpen) qa.classList.add("is-open");
    });
  });
})();
