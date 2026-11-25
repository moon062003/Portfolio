if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
if (window.gsap && window.ScrollTrigger && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);
  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from(".brand", { y: -18, opacity: 0, duration: 0.55 })
    .from(
      ".navlinks a",
      { y: -12, opacity: 0, stagger: 0.06, duration: 0.38 },
      "-=.32",
    )
    .from(
      ".nav-actions > *",
      { opacity: 0, stagger: 0.08, duration: 0.35 },
      "-=.3",
    )
    .from(".hero h1", { y: 45, opacity: 0, duration: 0.72 }, "-=.18")
    .from(
      ".hero-cta .button",
      { y: 18, opacity: 0, stagger: 0.07, duration: 0.42 },
      "-=.25",
    )
    .from(
      ".portrait-frame",
      { scale: 0.86, rotation: 3, opacity: 0, duration: 0.9 },
      "-=.7",
    );
  gsap.to(".portrait-frame", {
    y: -10,
    rotation: 1,
    duration: 3.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.fromTo(
    "#scrollProgress",
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.18,
      },
    },
  );
  gsap.fromTo(
    ".business-poster",
    { x: -42, opacity: 0.2, scale: 0.97 },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#business",
        start: "top 86%",
        end: "top 45%",
        scrub: 0.8,
      },
    },
  );
  gsap.fromTo(
    ".business-copy > *",
    { y: 28, opacity: 0.15 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      ease: "none",
      scrollTrigger: {
        trigger: "#business",
        start: "top 86%",
        end: "top 12%",
        scrub: 0.45,
      },
    },
  );
  document.querySelectorAll(".section").forEach((section) => {
    const heading = section.querySelector(".section-head");
    if (heading)
      gsap.fromTo(
        heading.children,
        { y: 42, opacity: 0.18 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            end: "top 58%",
            scrub: 0.8,
          },
        },
      );
  });
  gsap.fromTo(
    ".about-quote,.about-copy",
    { y: 55, opacity: 0.2, scale: 0.98 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.16,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-grid",
        start: "top 88%",
        end: "top 48%",
        scrub: 0.8,
      },
    },
  );
  gsap.fromTo(
    ".about-copy p,.about-copy .chips",
    { y: 24, opacity: 0.15 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-copy",
        start: "top 82%",
        end: "bottom 60%",
        scrub: 0.7,
      },
    },
  );
  gsap.fromTo(
    ".skill-card",
    { y: 58, opacity: 0.12, rotateX: 8, scale: 0.96 },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      stagger: 0.11,
      ease: "none",
      scrollTrigger: {
        trigger: ".skill-grid",
        start: "top 90%",
        end: "bottom 52%",
        scrub: 0.8,
      },
    },
  );
  gsap.fromTo(
    ".education-card",
    { x: -55, opacity: 0.15 },
    {
      x: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".education-card",
        start: "top 88%",
        end: "top 52%",
        scrub: 0.8,
      },
    },
  );
  document.querySelectorAll(".project-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 40, scale: 0.98 },
      {
        y: 0,
        duration: 0.65,
        delay: (index % 2) * 0.08,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          once: true,
        },
      },
    );
  });
  gsap.utils
    .toArray(".project-art")
    .forEach((art) =>
      gsap.fromTo(
        art,
        { backgroundPosition: "50% 65%" },
        {
          backgroundPosition: "50% 35%",
          ease: "none",
          scrollTrigger: {
            trigger: art,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      ),
    );
  gsap.fromTo(
    ".contact-card,.form-card",
    { y: 48, opacity: 0.15 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.16,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 88%",
        end: "top 48%",
        scrub: 0.8,
      },
    },
  );
  document.querySelectorAll(".hero-cta .button").forEach((button) => {
    const label = button.querySelector(".hero-cta-label");
    if (!label) return;

    const animateIn = () =>
      gsap.to(label, {
        y: -4,
        duration: 0.55,
        ease: "elastic.out(1, 0.35)",
        force3D: false,
        overwrite: "auto",
      });
    const animateOut = () =>
      gsap.to(label, {
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        force3D: false,
        overwrite: "auto",
      });

    button.addEventListener("pointerenter", animateIn);
    button.addEventListener("pointerleave", animateOut);
    button.addEventListener("focus", animateIn);
    button.addEventListener("blur", animateOut);
  });
  document
    .querySelectorAll(".skill-card,.contact-item")
    .forEach((item) => {
      item.addEventListener("pointerenter", () =>
        gsap.to(item, { y: -5, duration: 0.22, ease: "power2.out" }),
      );
      item.addEventListener("pointerleave", () =>
        gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" }),
      );
    });
  window.addEventListener("load", () => ScrollTrigger.refresh(), {
    once: true,
  });
}
