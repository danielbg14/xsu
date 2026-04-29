// ============================================================
// assets/js/pages/uchebni-planove.js
// Превключване на етапи (начален / прогимназиален / гимназиален)
// ============================================================

(function () {
    'use strict';
  
    // Expose globally so onclick="showEtap(...)" in HTML works
    window.showEtap = function (id, triggerEl) {
      document.querySelectorAll('.etap-section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.etap-btn').forEach(b => b.classList.remove('active'));
  
      const section = document.getElementById('etap-' + id);
      if (section) section.classList.add('active');
  
      // triggerEl is passed from onclick="showEtap(id, this)"
      // Fallback: try event.currentTarget (legacy, avoid where possible)
      if (triggerEl) {
        triggerEl.classList.add('active');
      } else if (typeof event !== 'undefined' && event.currentTarget) {
        event.currentTarget.classList.add('active');
      }
  
      // Re-trigger reveal animations inside the newly active section
      if (section) {
        section.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    };
  })();