(() => {
  const poster = document.querySelector(".business-poster");
  if (!poster || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  poster.addEventListener("pointerenter", (event) => {
    const bounds = poster.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - bounds.left, bounds.width));
    const y = Math.max(0, Math.min(event.clientY - bounds.top, bounds.height));
    const farthestX = Math.max(x, bounds.width - x);
    const farthestY = Math.max(y, bounds.height - y);
    const radius = Math.hypot(farthestX, farthestY);

    poster.style.setProperty("--reveal-x", `${x}px`);
    poster.style.setProperty("--reveal-y", `${y}px`);
    poster.style.setProperty("--reveal-radius", `${radius}px`);
    poster.classList.add("is-revealed");
  });

  poster.addEventListener("pointerleave", () => {
    poster.classList.remove("is-revealed");
  });
})();
const businessTitleLines = document.querySelectorAll(".business-title-line");
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  businessTitleLines.forEach((line) => {
    line.dataset.text = line.textContent?.trim() ?? "";
    line.addEventListener("pointerenter", () => line.classList.add("is-spotlit"));
    line.addEventListener("pointermove", (event) => {
      const bounds = line.getBoundingClientRect();
      line.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      line.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    });
    line.addEventListener("pointerleave", () => line.classList.remove("is-spotlit"));
  });
}