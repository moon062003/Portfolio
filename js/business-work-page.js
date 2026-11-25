(() => {
  const root = document.documentElement;
  if (localStorage.getItem("moon-portfolio-theme") === "dark") root.dataset.theme = "dark";

  const work = window.businessWorks?.find((item) => item.slug === new URLSearchParams(location.search).get("work"));
  const page = document.querySelector("#businessWorkPage");
  if (!work || !(page instanceof HTMLElement)) {
    location.replace("./index.html#business");
    return;
  }

  document.title = `${work.title} — Twilight Thread`;
  page.querySelector("[data-work-category]").textContent = work.category;
  page.querySelector("[data-work-title]").textContent = work.title;
  page.querySelector("[data-work-story]").textContent = work.story;

  const image = page.querySelector("[data-work-image]");
  image.src = work.mediaSrc;
  image.alt = work.mediaAlt;

  const details = page.querySelector("[data-work-details]");
  work.details.forEach(([label, value]) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    details.append(term, description);
  });
})();
