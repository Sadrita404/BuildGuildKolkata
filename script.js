// ===== FAQ Toggle =====
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
    }
  });
});

// ===== Projects Carousel =====
let currentProject = 0;
const totalProjects = 5;
let autoRotateInterval;

function showProject(index) {
  // Hide all projects
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Hide all dots
  document.querySelectorAll('.dot').forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show current project
  document.getElementById(`project-${index + 1}`).classList.add('active');
  document.querySelectorAll('.dot')[index].classList.add('active');
  
  currentProject = index;
}

function rotateCarousel(direction) {
  let nextIndex = currentProject + direction;
  
  // Loop around
  if (nextIndex >= totalProjects) nextIndex = 0;
  if (nextIndex < 0) nextIndex = totalProjects - 1;
  
  showProject(nextIndex);
  resetAutoRotate();
}

function jumpToProject(index) {
  showProject(index);
  resetAutoRotate();
}

function autoRotate() {
  rotateCarousel(1);
}

function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotateInterval = setInterval(autoRotate, 5000);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
  showProject(0);
  autoRotateInterval = setInterval(autoRotate, 5000);
  
  // Initialize project strip carousel
  const carouselBtns = document.querySelectorAll('.carousel-btn');
  carouselBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const track = document.getElementById(targetId);
      const scrollAmount = 360; // Card width + gap
      
      if (btn.classList.contains('carousel-btn-prev')) {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (btn.classList.contains('carousel-btn-next')) {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  });
});
