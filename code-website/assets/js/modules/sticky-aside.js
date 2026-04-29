/**
 * sticky-aside.js — Спира sticky sidebar точно преди footer-а
 * Използва се на: dokumenti-priem.html, faq.html и подобни с .priem-side-nav
 */
export function initStickyAside() {
    const layout = document.querySelector('.content-layout');
    const aside  = document.querySelector('.priem-side-nav');
    const footer = document.querySelector('footer');
    if (!layout || !aside || !footer) return;
  
    function syncAside() {
      if (window.matchMedia('(max-width: 960px)').matches) {
        aside.classList.remove('is-stopped');
        aside.style.top = aside.style.left = aside.style.width = aside.style.position = '';
        return;
      }
  
      const layoutRect = layout.getBoundingClientRect();
      const asideRect  = aside.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const margin = 24;
  
      const allowedTop = footerRect.top - margin - asideRect.height - layoutRect.top;
      const currentTop = asideRect.top - layoutRect.top;
  
      if (allowedTop < currentTop) {
        aside.classList.add('is-stopped');
        aside.style.top   = Math.max(0, allowedTop) + 'px';
        aside.style.left  = (asideRect.left - layoutRect.left) + 'px';
        aside.style.width = asideRect.width + 'px';
      } else {
        aside.classList.remove('is-stopped');
        aside.style.top = aside.style.left = aside.style.width = '';
      }
    }
  
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { rafId = 0; syncAside(); });
    };
  
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    syncAside();
  }