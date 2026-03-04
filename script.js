// script.js - Complete Interactive Portfolio
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "80px";
        navLinks.style.right = "20px";
        navLinks.style.background = "rgba(18, 19, 22, 0.95)";
        navLinks.style.backdropFilter = "blur(12px)";
        navLinks.style.border = "1px solid var(--border-color)";
        navLinks.style.borderRadius = "20px";
        navLinks.style.padding = "1.5rem";
        navLinks.style.width = "200px";
        navLinks.style.gap = "1rem";
        navLinks.style.zIndex = "1000";
      }
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
      }
    });
  });

  // Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav-link");

  function setActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href")?.substring(1) === current) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Parallax Effect on Orbs
  document.addEventListener("mousemove", (e) => {
    const orbs = document.querySelectorAll(".orb");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 20;
      const x = mouseX * speed - speed / 2;
      const y = mouseY * speed - speed / 2;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".edu-card, .project-card, .credential-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // Add tilt effect to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      const inner = card.querySelector(".project-card-inner");
      if (inner) {
        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      const inner = card.querySelector(".project-card-inner");
      if (inner) {
        inner.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
      }
    });
  });

  // Copy email to clipboard
  const emailChip = document.querySelector('.contact-chip[href^="mailto"]');
  if (emailChip) {
    emailChip.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("shakeermohammad791@gmail.com").then(() => {
        alert("Email copied to clipboard!");
      });
    });
  }

  // Dynamic year in footer
  const yearElement = document.querySelector(".footer-bottom p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(
      "2026",
      currentYear > 2026 ? currentYear : "2026",
    );
  }

  // Add smooth hover effect to skill items
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.1)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1)";
    });
  });

  // Scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-1);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: var(--shadow-md);
    z-index: 99;
    transition: all 0.3s;
  `;

  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollTopBtn.addEventListener("mouseenter", () => {
    scrollTopBtn.style.transform = "scale(1.1)";
  });

  scrollTopBtn.addEventListener("mouseleave", () => {
    scrollTopBtn.style.transform = "scale(1)";
  });

  // Add hover effect to credential items
  const credentialItems = document.querySelectorAll(".credential-item");
  credentialItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const icon = item.querySelector(".cred-icon");
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)";
      }
    });

    item.addEventListener("mouseleave", () => {
      const icon = item.querySelector(".cred-icon");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0)";
      }
    });
  });
});
