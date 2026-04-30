export function initSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.hero-dot');
    if (!slides.length || !dots.length) return;
  
    let cur = 0;
    let sliderTimer;
  
    function goTo(idx) {
      slides[cur].classList.remove('active');
      dots[cur].classList.remove('active');
      cur = idx;
      slides[cur].classList.add('active');
      dots[cur].classList.add('active');
    }
  
    function startSlider() {
      sliderTimer = setInterval(() => goTo((cur + 1) % slides.length), 5500);
    }
  
    dots.forEach(d => d.addEventListener('click', () => {
      clearInterval(sliderTimer);
      goTo(+d.dataset.idx);
      startSlider();
    }));
  
    startSlider();
  }