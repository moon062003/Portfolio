(() => {
  const projects = window.portfolioProjects ?? [];
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  function previewMarkup(project) {
    if (project.video) {
      return `<video class="project-preview-media" src="${escapeHtml(project.video)}" aria-label="Animated preview of ${escapeHtml(project.title)}" autoplay muted loop playsinline preload="metadata"></video>`;
    }
    return `<img class="project-preview-media" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} project preview" loading="lazy">`;
  }

  function cardMarkup(project, index, fullPage) {
    const tags = project.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
    const features = fullPage
      ? `<ul class="project-feature-list">${project.features.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";
    const demo = project.demoUrl
      ? `<a class="chip" href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noreferrer">${escapeHtml(project.demoLabel ?? "Live Demo")} ↗</a>`
      : "";
    const detailsUrl = `./project-detail.html?project=${encodeURIComponent(project.id)}`;

    return `<article class="project-card project-card--${fullPage ? "detail" : "featured"}">
      <div class="project-art">${previewMarkup(project)}<span class="project-monogram">${escapeHtml(project.stack[0].toUpperCase())}</span></div>
      <div class="project-info">
        <div class="project-title-row"><h3>${escapeHtml(project.title)}</h3><span class="project-number">${String(index + 1).padStart(2, "0")}</span></div>
        <p>${escapeHtml(project.description)}</p>${features}
        <div class="project-tags">${tags}</div>
        <div class="chips">${demo}<a class="chip" href="${escapeHtml(project.github)}" target="_blank" rel="noreferrer">GitHub ↗</a><a class="chip" href="${detailsUrl}">Details ↗</a></div>
      </div>
    </article>`;
  }

  document.querySelectorAll("[data-project-list]").forEach((list) => {
    const fullPage = list.dataset.projectList === "all";
    list.innerHTML = projects.map((project, index) => cardMarkup(project, index, fullPage)).join("");
  });
})();
