import { initSlider }  from '../modules/slider.js';
import { initCountUp } from '../modules/counters.js';

initSlider();
initCountUp();

// Hero title анимация при начално зареждане
// Браузърът не вижда transition ако active е в HTML от старта —
// затова го премахваме и веднага го добавяме обратно след 2 frame-а
const firstSlide = document.querySelector('.hero-slide.active');
if (firstSlide) {
  firstSlide.classList.remove('active');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      firstSlide.classList.add('active');
    });
  });
}