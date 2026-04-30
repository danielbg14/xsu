export function initNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
  
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }