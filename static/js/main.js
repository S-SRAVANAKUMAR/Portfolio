document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  // === 2. Back to Top Button ===
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === 3. Active Nav Link ===
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});

function scrollCarousel(id, direction) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const card = carousel.querySelector('.project-card');
  const cardWidth = card ? card.offsetWidth + 24 : 300;
  carousel.scrollBy({
    left: direction === 'left' ? -cardWidth : cardWidth,
    behavior: 'smooth'
  });
}

// Recommendation slider
let currentRec = 0;
const cards = document.querySelectorAll(".recommendation-card");
const dotsContainer = document.getElementById("recDots");

function showRecommendation(index) {
  cards.forEach((card, i) => {
    card.classList.remove("active");
    dotsContainer.children[i].classList.remove("active-dot");
    if (i === index) {
      card.classList.add("active");
      dotsContainer.children[i].classList.add("active-dot");
    }
  });
}

function changeRec(direction) {
  currentRec += direction;
  if (currentRec < 0) currentRec = cards.length - 1;
  if (currentRec >= cards.length) currentRec = 0;
  showRecommendation(currentRec);
}

function setupRecDots() {
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active-dot");
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", () => {
      currentRec = i;
      showRecommendation(i);
    });
  });
}

// Initial setup
setupRecDots();
showRecommendation(currentRec); 

// ✅ Auto-play every 6 seconds
setInterval(() => {
  changeRec(1);
}, 6000);


