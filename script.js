// Hamburger Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("main-nav");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isExpanded = hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", isExpanded);
});

// Close menu when a nav link is clicked
document.querySelectorAll("#main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
  });
});

// Close menu on outside touch or click
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
  }
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectGrid = document.querySelector('.project-grid');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    let visibleCount = 0;
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      const show = filter === 'all' || categories.includes(filter);
      card.style.display = show ? 'block' : 'none';
      if (show) visibleCount++;
    });

    projectGrid.classList.toggle('single-item', visibleCount === 1);
  });
});

// Theme Switching Logic
const toggleBtn = document.getElementById("themeToggle");
const themeStylesheet = document.getElementById("themeStylesheet");
const heroImg = document.getElementById("hero-img");

function setTheme(theme) {
  const isDark = theme === "dark";
  themeStylesheet.href = isDark ? "style2.css" : "style1.css";
  toggleBtn.innerHTML = isDark
    ? "🌙 <span id='themeLabel'>Dark Theme</span>"
    : "🌞 <span id='themeLabel'>Light Theme</span>";
  heroImg.src = isDark
    ? "images/heroback-light.png"
    : "images/heroback-dark.png";
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

// Apply saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

// Theme toggle click
toggleBtn.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
  setTheme(currentTheme);
});
