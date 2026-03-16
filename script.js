/* ===========================
   KINGDOM 101 - JAVASCRIPT
   =========================== */

// === NAV TOGGLE (MOBILE) ===
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// === STICKY HEADER & ACTIVE NAV LINK ===
const header = document.querySelector('.site-header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 80;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.main-nav a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', () => {
  updateActiveNav();
});

// === SCROLL TO TOP ===
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === AMENITY SLIDER ===
const amenitySlides = document.querySelectorAll('.amenity-slide');
const amenityDots = document.querySelectorAll('.adot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  amenitySlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  amenityDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

amenityDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    // Map dot index to slide index (some slides have 2 items)
    const slideIndex = Math.floor(i / 2);
    showSlide(Math.min(slideIndex, amenitySlides.length - 1));
    resetSlideInterval();
  });
});

function nextSlide() {
  const next = (currentSlide + 1) % amenitySlides.length;
  showSlide(next);
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 4000);
}

slideInterval = setInterval(nextSlide, 4000);

// === FLOOR PLAN TABS ===
const mbTabs = document.querySelectorAll('.mb-tab');
const mbPanels = document.querySelectorAll('.mb-panel');

mbTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = 'panel-' + tab.getAttribute('data-tab');
    
    mbTabs.forEach(t => t.classList.remove('active'));
    mbPanels.forEach(p => p.classList.remove('active'));
    
    tab.classList.add('active');
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) targetPanel.classList.add('active');
  });
});

// === SMOOTH SCROLL FOR NAV LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 65;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile nav if open
      if (navList) navList.classList.remove('open');
    }
  });
});

// === SCROLL REVEAL ANIMATION ===
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

// Add reveal class to key elements
function initReveal() {
  const targetSelectors = [
    '.tong-quan-grid',
    '.vi-tri-grid',
    '.amenity-img-grid',
    '.dac-quyen-grid',
    '.thiet-ke-intro',
    '.doi-tac-grid',
    '.payment-table',
    '.dq-item',
    '.dt-card',
    '.stat-item',
  ];

  targetSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
    });
  });

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
}

// === CONTACT FORM ===
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('contactForm');

  // Simple validation
  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!fullname || !email || !phone) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  btn.textContent = 'ĐANG GỬI...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ ĐÃ GỬI';
    btn.style.background = '#2ecc71';
    btn.style.color = '#fff';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'GỬI';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  }, 1200);
}

// === HEADER LEAF PATTERN (canvas animation) ===
function animateHeaderLeaves() {
  // subtle leaf decorations in header via CSS - handled in CSS
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  updateActiveNav();
  animateHeaderLeaves();
});
