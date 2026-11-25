const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const savedTheme = localStorage.getItem("moon-portfolio-theme");
if (savedTheme === "dark") {
  root.dataset.theme = "dark";
  themeIcon.textContent = "☼";
  themeToggle.setAttribute("aria-label", "Switch to light theme");
} else {
  delete root.dataset.theme;
  themeIcon.textContent = "☾";
  themeToggle.setAttribute("aria-label", "Switch to dark theme");
}
const portraitFrame = document.querySelector(".portrait-frame");
if (portraitFrame && savedTheme === "dark") portraitFrame.classList.add("is-dark");
let portraitRevealTimer = 0;
function revealPortraitTheme(dark, event) {
  if (!portraitFrame) return;
  const bounds = portraitFrame.getBoundingClientRect();
  const clientX = event.detail ? event.clientX : bounds.left + bounds.width / 2;
  const clientY = event.detail ? event.clientY : bounds.top + bounds.height / 2;
  const x = Math.max(0, Math.min(bounds.width, clientX - bounds.left));
  const y = Math.max(0, Math.min(bounds.height, clientY - bounds.top));
  const radius = Math.ceil(Math.max(
    Math.hypot(x, y),
    Math.hypot(bounds.width - x, y),
    Math.hypot(x, bounds.height - y),
    Math.hypot(bounds.width - x, bounds.height - y),
  )) + 2;
  portraitFrame.style.setProperty("--portrait-reveal-x", `${x}px`);
  portraitFrame.style.setProperty("--portrait-reveal-y", `${y}px`);
  portraitFrame.style.setProperty("--portrait-reveal-radius", `${radius}px`);
  portraitFrame.classList.add("is-theme-revealing");
  requestAnimationFrame(() => portraitFrame.classList.toggle("is-dark", dark));
  window.clearTimeout(portraitRevealTimer);
  portraitRevealTimer = window.setTimeout(() => {
    portraitFrame.classList.remove("is-theme-revealing");
  }, 820);
}
themeToggle.addEventListener("click", (event) => {
  const dark = root.dataset.theme !== "dark";
  if (dark) {
    root.dataset.theme = "dark";
    themeIcon.textContent = "☼";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
    localStorage.setItem("moon-portfolio-theme", "dark");
  } else {
    delete root.dataset.theme;
    themeIcon.textContent = "☾";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
    localStorage.setItem("moon-portfolio-theme", "light");
  }
  revealPortraitTheme(dark, event);
  if (window.gsap)
    gsap.fromTo(
      themeToggle,
      { rotation: -35, scale: 0.88 },
      { rotation: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
    );
  if (window.gsap)
    gsap.fromTo(
      "body",
      { opacity: 0.78 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );
});

