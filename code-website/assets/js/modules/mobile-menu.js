/**
 * mobile-menu.js — Hamburger меню и субменюта
 */
export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;
  
    let menuOpen = false;
  
    function openMenu() {
      menuOpen = true;
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  
    function closeMenu() {
      menuOpen = false;
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  
    hamburger.addEventListener('click', () => {
      menuOpen ? closeMenu() : openMenu();
    });
  
    // Затвори при клик върху линк
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  
    // Затвори при клик извън менюто
    document.addEventListener('click', (e) => {
      if (menuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }
  
  /**
   * toggleMobSub — отваря/затваря субменю в мобилното меню.
   * Остава глобална функция, защото се извиква с onclick="" в HTML.
   */
  window.toggleMobSub = function (btn) {
    const item = btn.closest('.mobile-menu-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.mobile-menu-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };