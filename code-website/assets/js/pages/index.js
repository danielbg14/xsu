/**
 * pages/index.js — Специфичен JS за началната страница
 *
 * Добави в index.html преди </body>:
 *   <script type="module" src="assets/js/pages/index.js" defer></script>
 */
import { initSlider }  from '../modules/slider.js';
import { initCountUp } from '../modules/counters.js';

initSlider();
initCountUp();