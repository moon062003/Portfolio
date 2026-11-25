(() => {
  const projectId = new URLSearchParams(location.search).get("project");
  const project = window.portfolioProjects?.find((item) => item.id === projectId);
  const page = document.querySelector("[data-project-detail]");

  if (!project || !(page instanceof HTMLElement)) {
    location.replace("./index.html#projects");
    return;
  }

  document.title = `${project.title} — Marufa Sultana Moon`;
  page.querySelector("[data-project-title]").textContent = project.title;
  page.querySelector("[data-project-description]").textContent = project.description;
  page.querySelector("[data-project-overview]").textContent = project.overview;

  const stackLine = page.querySelector("[data-project-stack-line]");
  stackLine.textContent = project.stack.join("  |  ");

  const stack = page.querySelector("[data-project-stack]");
  project.stack.forEach((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    stack.append(tag);
  });

  const highlights = page.querySelector("[data-project-highlights]");
  project.features.forEach((item) => {
    const feature = document.createElement("li");
    feature.textContent = item;
    highlights.append(feature);
  });

  const media = project.video ? document.createElement("video") : document.createElement("img");
  media.className = "project-detail-media";
  media.src = project.video ?? project.image;
  if (media instanceof HTMLVideoElement) {
    media.controls = true;
    media.playsInline = true;
    media.muted = true;
    media.loop = true;
    media.preload = "metadata";
    media.setAttribute("aria-label", `${project.title} video demo`);
  } else {
    media.alt = `${project.title} project preview`;
  }
  page.querySelector("[data-project-media]").append(media);

  const demoLink = page.querySelector("[data-project-demo]");
  const demoNote = page.querySelector("[data-demo-note]");
  if (project.demoUrl) {
    demoLink.href = project.demoUrl;
    demoLink.textContent = `${project.demoLabel ?? "Open Live Project"} ↗`;
    demoLink.hidden = false;
    demoNote.hidden = true;
  } else {
    demoLink.hidden = true;
    demoNote.hidden = false;
  }

  page.querySelector("[data-project-github]").href = project.github;
})();
