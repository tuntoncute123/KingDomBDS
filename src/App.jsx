import { useEffect } from 'react';
import landingMarkup from './landing.html?raw';

function App() {
  useEffect(() => {
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    const logoReloadLink = document.getElementById('logoReloadLink');
    const headerLogoImg = document.getElementById('headerLogoImg');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
    const scrollTopBtn = document.getElementById('scrollTop');
    const amenitySlides = Array.from(document.querySelectorAll('.amenity-slide'));
    const amenityDots = Array.from(document.querySelectorAll('.adot'));
    const mbTabs = Array.from(document.querySelectorAll('.mb-tab'));
    const mbPanels = Array.from(document.querySelectorAll('.mb-panel'));

    const activeNavOffset = 110;
    const smoothScrollOffset = 95;

    let currentSlide = 0;
    let slideInterval;

    const updateActiveNav = () => {
      const scrollPos = window.scrollY + activeNavOffset;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.main-nav a[href="#${id}"]`);

        if (!link) {
          return;
        }

        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach((navLink) => navLink.classList.remove('active'));
          link.classList.add('active');
        }
      });
    };

    const showSlide = (index) => {
      amenitySlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      amenityDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentSlide = index;
    };

    const nextSlide = () => {
      if (!amenitySlides.length) {
        return;
      }

      const next = (currentSlide + 1) % amenitySlides.length;
      showSlide(next);
    };

    const resetSlideInterval = () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }

      slideInterval = setInterval(nextSlide, 4000);
    };

    const revealOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          element.classList.add('visible');
        }
      });
    };

    const initReveal = () => {
      const targetSelectors = [
        '.tong-quan-grid',
        '.sec_vi_tri .banner',
        '.amenity-img-grid',
        '.sec_lien_ket .row_lien_ket',
        '.dac-quyen-grid',
        '.thiet-ke-intro',
        '.doi-tac-grid',
        '.sec_thanh_toan .section-content',
        '.dq-item',
        '.dt-card',
        '.stat-item',
      ];

      targetSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          element.classList.add('reveal');
        });
      });

      revealOnScroll();
    };

    const animateHeaderLeaves = () => {
      // Decorative hook kept to preserve behavior parity with the original code.
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      const btn = document.getElementById('submitBtn');
      const form = document.getElementById('contactForm');
      const fullnameInput = document.getElementById('fullname');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');

      if (!btn || !form || !fullnameInput || !emailInput || !phoneInput) {
        return;
      }

      const fullname = fullnameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();

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
    };

    const navToggleClickHandler = () => {
      navList?.classList.toggle('open');
    };

    const logoClickHandler = (event) => {
      event.preventDefault();
      window.location.reload();
    };

    const logoLoadHandler = () => {
      logoReloadLink?.classList.remove('logo-missing');
    };

    const logoErrorHandler = () => {
      logoReloadLink?.classList.add('logo-missing');
    };

    const scrollTopClickHandler = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const windowScrollHandler = () => {
      updateActiveNav();

      if (scrollTopBtn) {
        if (window.scrollY > 400) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }

      revealOnScroll();
    };

    const amenityDotHandlers = amenityDots.map((dot, index) => {
      const handler = () => {
        const slideIndex = Math.floor(index / 2);
        showSlide(Math.min(slideIndex, Math.max(amenitySlides.length - 1, 0)));
        resetSlideInterval();
      };

      dot.addEventListener('click', handler);
      return { dot, handler };
    });

    const tabHandlers = mbTabs.map((tab) => {
      const handler = () => {
        const targetId = `panel-${tab.getAttribute('data-tab')}`;

        mbTabs.forEach((tabButton) => tabButton.classList.remove('active'));
        mbPanels.forEach((panel) => panel.classList.remove('active'));

        tab.classList.add('active');

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      };

      tab.addEventListener('click', handler);
      return { tab, handler };
    });

    const smoothLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    const smoothLinkHandlers = smoothLinks.map((link) => {
      const handler = (event) => {
        const href = link.getAttribute('href');

        if (!href || href === '#') {
          return;
        }

        const target = document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();

        const top = target.getBoundingClientRect().top + window.scrollY - smoothScrollOffset;
        window.scrollTo({ top, behavior: 'smooth' });

        navList?.classList.remove('open');
      };

      link.addEventListener('click', handler);
      return { link, handler };
    });

    navToggle?.addEventListener('click', navToggleClickHandler);
    logoReloadLink?.addEventListener('click', logoClickHandler);
    headerLogoImg?.addEventListener('load', logoLoadHandler);
    headerLogoImg?.addEventListener('error', logoErrorHandler);
    scrollTopBtn?.addEventListener('click', scrollTopClickHandler);
    window.addEventListener('scroll', windowScrollHandler);

    if (headerLogoImg?.complete) {
      if (headerLogoImg.naturalWidth > 0) {
        logoLoadHandler();
      } else {
        logoErrorHandler();
      }
    }

    if (amenitySlides.length) {
      slideInterval = setInterval(nextSlide, 4000);
    }

    initReveal();
    updateActiveNav();
    animateHeaderLeaves();
    window.handleSubmit = handleSubmit;

    return () => {
      navToggle?.removeEventListener('click', navToggleClickHandler);
      logoReloadLink?.removeEventListener('click', logoClickHandler);
      headerLogoImg?.removeEventListener('load', logoLoadHandler);
      headerLogoImg?.removeEventListener('error', logoErrorHandler);
      scrollTopBtn?.removeEventListener('click', scrollTopClickHandler);
      window.removeEventListener('scroll', windowScrollHandler);

      amenityDotHandlers.forEach(({ dot, handler }) => {
        dot.removeEventListener('click', handler);
      });

      tabHandlers.forEach(({ tab, handler }) => {
        tab.removeEventListener('click', handler);
      });

      smoothLinkHandlers.forEach(({ link, handler }) => {
        link.removeEventListener('click', handler);
      });

      if (slideInterval) {
        clearInterval(slideInterval);
      }

      delete window.handleSubmit;
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: landingMarkup }} />;
}

export default App;
