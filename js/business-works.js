(() => {
  const grid = document.querySelector("#businessWorkGrid");
  const works = window.businessWorks;
  if (!(grid instanceof HTMLElement) || !Array.isArray(works)) return;

  works.forEach((work, index) => {
    const card = document.createElement("a");
    card.className = "business-work-card";
    card.href = `./business-work.html?work=${encodeURIComponent(work.slug)}`;
    card.setAttribute("aria-label", `View work ${index + 1}: ${work.title}`);

    const image = document.createElement("span");
    image.className = "business-work-card-media";
    const picture = document.createElement("img");
    picture.src = work.mediaSrc;
    picture.alt = work.mediaAlt;
    picture.classList.add(`business-work-image--${work.slug}`);
    if (work.slug === "nick-wilde-crochet-keychain") {
      picture.style.objectPosition = "50% 64%";
    }
    picture.loading = "lazy";
    image.append(picture);

    const copy = document.createElement("span");
    copy.className = "business-work-card-copy";
    const label = document.createElement("span");
    label.className = "business-work-card-category";
    label.textContent = `${String(index + 1).padStart(2, "0")} / ${work.category}`;
    const heading = document.createElement("span");
    heading.className = "business-work-card-title";
    heading.textContent = work.title;
    const summary = document.createElement("span");
    summary.className = "business-work-card-summary";
    summary.textContent = work.summary;
    const more = document.createElement("span");
    more.className = "business-work-card-more";
    more.innerHTML = "View story <span aria-hidden=\"true\">↗</span>";

    copy.append(label, heading, summary, more);
    card.append(image, copy);
    grid.append(card);
  });
})();

