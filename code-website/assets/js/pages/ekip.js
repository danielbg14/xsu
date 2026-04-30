/**
 * pages/ekip.js — Специфичен JS за страница „Училищен екип"
 *
 * Добави в ekip.html преди </body>:
 *   <script type="module" src="assets/js/pages/ekip.js" defer></script>
 */
import { initTeamFilter }  from '../modules/team-filter.js';
import { initStatCounters } from '../modules/counters.js';

document.addEventListener("DOMContentLoaded", () => {
  initTeamFilter();
  initStatCounters();

  // force initial state
  document.querySelector('.filter-btn.active')?.click();
});