const menuToggle = document.getElementById("menuToggle");
const navlinks = document.getElementById("navlinks");
menuToggle.addEventListener("click", () => {
  const open = navlinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
  document.getElementById("menuIcon").textContent = open ? "×" : "☰";
  if (
    open &&
    window.gsap &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    gsap.fromTo(
      navlinks.children,
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.32, ease: "power2.out" },
    );
});
navlinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navlinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.getElementById("menuIcon").textContent = "☰";
  }),
);
const backTop = document.getElementById("backTop");
backTop.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
  history.replaceState(null, "", `${location.pathname}${location.search}`);
});
const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...navlinks.querySelectorAll("a")];
window.addEventListener(
  "scroll",
  () => backTop.classList.toggle("show", window.scrollY > 500),
  { passive: true },
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        navAnchors.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id,
          ),
        );
    }),
  { rootMargin: "-35% 0px -55% 0px" },
);
sections.forEach((section) => observer.observe(section));
