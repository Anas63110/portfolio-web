/* =====================
   LOADER
   ===================== */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
    setTimeout(() => loader.remove(), 700);
  }, 2200);
});

/* =====================
   HAMBURGER MENU
   ===================== */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* =====================
   DARK / LIGHT MODE
   ===================== */
const html = document.documentElement;
const toggleBtns = document.querySelectorAll(".theme-toggle");

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  toggleBtns.forEach(btn => {
    btn.querySelector(".theme-icon").textContent = theme === "dark" ? "☀️" : "🌙";
  });
}

// Load saved preference
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
});

/* =====================
   SCROLL TO TOP
   ===================== */
const scrollBtn = document.getElementById("scroll-top-btn");
window.addEventListener("scroll", () => {
  scrollBtn.classList.toggle("visible", window.scrollY > 400);
});

/* =====================
   TYPED TEXT EFFECT
   ===================== */
const roles = ["Frontend Developer", "Flutter Developer", "MERN Stack Developer", "WordPress Developer"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

/* =====================
   FADE IN ON SCROLL
   ===================== */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".fade-in-section").forEach(el => fadeObserver.observe(el));

/* =====================
   SKILL BARS ANIMATION
   ===================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-fill").forEach(bar => {
        bar.style.width = bar.dataset.width + "%";
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsGrid = document.querySelector(".skills-grid");
if (skillsGrid) skillObserver.observe(skillsGrid);

/* =====================
   PROJECT TABS
   ===================== */
function showTab(tabId) {
  document.querySelectorAll(".project-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  const btns = document.querySelectorAll(".tab-button");
  const map = { "js-projects": 0, "react-projects": 1, "mern-projects": 2, "wordpress-projects": 3, "flutter-projects": 4 };
  btns[map[tabId]].classList.add("active");
}