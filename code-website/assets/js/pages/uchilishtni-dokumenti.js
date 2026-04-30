/**
 * Маркира активния линк в навбара като "Документи"
 * Извиква се след като components-init.js е заредил navbar.html.
 */
function markActiveNavLink() {
  const links = document.querySelectorAll('.nav-links a, .nav-item > a');
  links.forEach(link => {
    // Премахни предишен active
    link.classList.remove('active');
    // Провери дали текстът или href съответства на "Документи"
    const href = link.getAttribute('href') || '';
    const text = link.textContent.trim();
    if (
      href.includes('uchilishtni-dokumenti') ||
      text === 'Документи'
    ) {
      link.classList.add('active');
    }
  });
}

/**
 * Анимира doc-card елементите с staggered delay при влизане в viewport.
 * Използва IntersectionObserver — без конфликт с глобалния reveal.js,
 * защото работи с клас .doc-card, а не с .reveal.
 */
function initDocCardReveal() {
  const cards = document.querySelectorAll('.doc-card');

  if (!cards.length) return;

  // Задаване на начално скрито състояние чрез inline стил
  // (не презаписваме глобалния .reveal клас)
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity .5s ${i * 0.06}s, transform .5s ${i * 0.06}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  cards.forEach(card => observer.observe(card));
}

/**
 * Подчертава активната група (текуща учебна година) чрез лек highlight.
 */
function highlightCurrentYearGroup() {
  const yearTag = document.querySelector('.docs-year-tag');
  if (yearTag && yearTag.textContent.includes('Текуща')) {
    const group = yearTag.closest('.docs-year-group');
    if (group) {
      group.style.position = 'relative';
    }
  }
}

/**
 * Инициализация — чака navbar/footer компонентите да се заредят.
 * Използва MutationObserver за да засече кога navbar-container е попълнен.
 */
function init() {
  // Изчакай navbar компонента (зареден от components-init.js)
  const navbarContainer = document.getElementById('navbar-container');

  if (navbarContainer) {
    const mo = new MutationObserver(() => {
      if (navbarContainer.innerHTML.trim()) {
        markActiveNavLink();
        mo.disconnect();
      }
    });
    mo.observe(navbarContainer, { childList: true, subtree: true });
  }

  // Инициализирай останалото след DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initDocCardReveal();
      highlightCurrentYearGroup();
    });
  } else {
    initDocCardReveal();
    highlightCurrentYearGroup();
  }
}

init();