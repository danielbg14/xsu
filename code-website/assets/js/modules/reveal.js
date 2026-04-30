export function initReveal({ selector = '.reveal, .reveal-left, .reveal-right', threshold = 0.1 } = {}) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
  
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold });
  
    els.forEach(el => io.observe(el));
  }