/**
 * counters.js — Анимирани числа (count-up)
 *
 * Използване:
 *   Прост вариант (index.html): <span class="count-up" data-target="1200"></span>
 *   Разширен вариант (ekip.html): <span class="num">45</span> вътре в .stat-item
 */

/** Прост count-up: .count-up[data-target] */
export function initCountUp() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;
  
    function countUp(el) {
      const target = +el.dataset.target;
      let v = 0;
      const step = target / 80;
      const id = setInterval(() => {
        v = Math.min(v + step, target);
        el.textContent = Math.round(v);
        if (v >= target) clearInterval(id);
      }, 18);
    }
  
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          countUp(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
  
    counters.forEach(c => io.observe(c));
  }
  
  /** Разширен count-up с easing: .stat-item > .num (ekip.html) */
  export function initStatCounters() {
    const items = document.querySelectorAll('.stat-item');
    if (!items.length) return;
  
    function animateNumber(el, target, duration) {
      let start = 0;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl = entry.target.querySelector('.num');
          if (!numEl) return;
          const target = parseInt(numEl.textContent, 10);
          numEl.textContent = '0';
          entry.target.classList.add('visible');
          setTimeout(() => animateNumber(numEl, target, 700), 100);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    items.forEach(el => io.observe(el));
  }