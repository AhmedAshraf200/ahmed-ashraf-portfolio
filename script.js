document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // THEME TOGGLE
  // =============================================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const profileImg = document.getElementById('profileImage');

  function updateProfileImage(theme) {
    if (!profileImg) return;
    profileImg.src = theme === 'dark' ? 'img/ahmed2.png' : 'img/Ahmed.jpeg';
  }

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.removeAttribute('data-theme');
  }
  updateProfileImage(currentTheme);

  themeToggle.addEventListener('click', function () {
    let newTheme;
    if (body.getAttribute('data-theme') === 'dark') {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      newTheme = 'light';
    } else {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      newTheme = 'dark';
    }
    updateProfileImage(newTheme);
  });

  // =============================================
  // AOS INIT
  // =============================================
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // =============================================
  // LEGACY PROGRESS BARS (kept for safety)
  // =============================================
  const progressBars = document.querySelectorAll('.progress-bar');
  const legacyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width') + '%';
        legacyObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });
  progressBars.forEach(bar => legacyObserver.observe(bar));

  // =============================================
  // SKILL PILL BARS (new design)
  // =============================================
  const pillFills = document.querySelectorAll('.skill-pill-fill');
  const pillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        // small delay for stagger effect
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 100);
        pillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -40px 0px' });
  pillFills.forEach(fill => pillObserver.observe(fill));

  // =============================================
  // NAVBAR ON SCROLL
  // =============================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50
      ? '0 2px 20px rgba(0, 0, 0, 0.1)'
      : '0 2px 10px rgba(0, 0, 0, 0.1)';
  });

  // =============================================
  // SMOOTH SCROLL
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // FLOATING PROFILE IMAGE
  // =============================================
  const profileImgContainer = document.querySelector('.profile-img-container');
  if (profileImgContainer) profileImgContainer.classList.add('floating');

  // =============================================
  // TYPING EFFECT (hero subtitle)
  // =============================================
  const heroSubtitle = document.querySelector('.hero h2');
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    };
    setTimeout(typeWriter, 500);
  }

  // =============================================
  // MOUSE GLOW EFFECT
  // =============================================
  const mouseGlow = document.getElementById('mouseGlow');
  if (mouseGlow) {
    let glowVisible = false;
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateGlow = () => {
      currentX = lerp(currentX, mouseX, 0.08);
      currentY = lerp(currentY, mouseY, 0.08);
      mouseGlow.style.left = currentX + 'px';
      mouseGlow.style.top  = currentY + 'px';
      requestAnimationFrame(animateGlow);
    };
    animateGlow();

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!glowVisible) {
        mouseGlow.style.opacity = '1';
        glowVisible = true;
      }
    });
    document.addEventListener('mouseleave', () => {
      mouseGlow.style.opacity = '0';
      glowVisible = false;
    });

    const interactiveEls = document.querySelectorAll(
      'a, button, .exp-card, .service-box, .project-card, .soft-skill-item, .social-link, .skill-pill-card, .edu-card, .lang-card, .about-bio-card'
    );
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        mouseGlow.style.width  = '520px';
        mouseGlow.style.height = '520px';
        mouseGlow.style.opacity = '1';
      });
      el.addEventListener('mouseleave', () => {
        mouseGlow.style.width  = '380px';
        mouseGlow.style.height = '380px';
      });
    });
  }

});
