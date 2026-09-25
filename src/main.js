import "./style.css";

const header = document.querySelector(".site-header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Compact header once we've started scrolling
  if (currentScrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Hide while scrolling down, reveal while scrolling up
  if (currentScrollY > lastScrollY && currentScrollY > 180) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollY = currentScrollY;
});

/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   BEFORE / AFTER COMPARISON SLIDER
   ========================================================= */

const comparisonSlider = document.querySelector(".comparison-slider");
const comparisonRange = document.querySelector(".comparison-range");

if (comparisonSlider && comparisonRange) {
  const updateComparison = (value) => {
    comparisonSlider.style.setProperty("--comparison-position", `${value}%`);
  };

  comparisonRange.addEventListener("input", (event) => {
    updateComparison(event.target.value);
  });

  updateComparison(comparisonRange.value);
}

const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

function openMobileMenu() {
  menuToggle.classList.add("is-open");
  mobileMenu.classList.add("is-open");
  document.body.classList.add("menu-open");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
  mobileMenu.setAttribute("aria-hidden", "false");
}

function closeMobileMenu() {
  menuToggle.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  mobileMenu.setAttribute("aria-hidden", "true");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("is-open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});
