const contactForm = document.getElementById("contactForm");
const submitButton = contactForm.querySelector(".form-submit");
const submitLabel = submitButton.querySelector(".form-submit-label");
const formNote = document.getElementById("formNote");
let isPreparingEmail = false;

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isPreparingEmail) return;
  isPreparingEmail = true;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:marufasultanamoon0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  submitLabel.textContent = "";
  submitButton.disabled = true;
  submitButton.classList.add("is-sending");
  formNote.textContent = "Opening your email app…";

  const finishEmailDraft = () => {
    submitLabel.textContent = "Email ready";
    submitButton.classList.remove("is-sending");
    submitButton.disabled = false;
    formNote.textContent = "Your email app is ready. Send the message there to finish.";
    isPreparingEmail = false;
  };

  if (window.gsap && window.TextPlugin) {
    gsap.registerPlugin(TextPlugin);
    gsap
      .timeline({ onComplete: finishEmailDraft })
      .to(submitLabel, {
        duration: 1.15,
        text: { value: "Sending…" },
        ease: "none",
      })
      .to({}, { duration: 0.35 })
      .call(() => {
        submitLabel.textContent = "Email ready";
        submitButton.classList.remove("is-sending");
      })
      .to({}, { duration: 0.65 });
  } else {
    submitLabel.textContent = "Sending…";
    window.setTimeout(finishEmailDraft, 1600);
  }

  window.location.href = mailto;
});