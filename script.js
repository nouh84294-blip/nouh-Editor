// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Reveal sections when they enter the viewport
  const revealElements = document.querySelectorAll(
    ".reveal, .fade-in, .project-card, .service-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Update the footer year automatically
  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Copy email address when clicking the copy button
  const copyEmailButton = document.querySelector("#copy-email");
  const emailElement = document.querySelector("#email");

  if (copyEmailButton && emailElement) {
    copyEmailButton.addEventListener("click", async () => {
      const email = emailElement.textContent.trim();

      try {
        await navigator.clipboard.writeText(email);
        copyEmailButton.textContent = "Copied!";

        setTimeout(() => {
          copyEmailButton.textContent = "Copy Email";
        }, 2000);
      } catch (error) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Add a subtle effect to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });
  });
});
