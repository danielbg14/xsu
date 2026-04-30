(function () {
    'use strict';
  
    /* ─────────────────────────────────────────────
       1. ACCORDION
    ───────────────────────────────────────────── */
    function initAccordion() {
      const headers = document.querySelectorAll('.year-header');
  
      headers.forEach(function (header) {
        header.addEventListener('click', function () {
          const targetId = this.getAttribute('data-target');
          const docs     = document.getElementById(targetId);
          if (!docs) return;
  
          const isOpen = !docs.classList.contains('year-docs--closed');
  
          if (isOpen) {
            // Close
            docs.classList.add('year-docs--closed');
            this.classList.remove('year-header--open');
  
            const chevron = this.querySelector('.year-chevron');
            if (chevron) chevron.classList.remove('year-chevron--open');
          } else {
            // Open
            docs.classList.remove('year-docs--closed');
            this.classList.add('year-header--open');
  
            const chevron = this.querySelector('.year-chevron');
            if (chevron) chevron.classList.add('year-chevron--open');
          }
        });
      });
    }
  
    /* ─────────────────────────────────────────────
       2. ACTIVE YEAR PILL ON SCROLL
    ───────────────────────────────────────────── */
    function initYearPillHighlight() {
      const pills      = document.querySelectorAll('.year-pill');
      const yearBlocks = document.querySelectorAll('.year-block[id]');
  
      if (!pills.length || !yearBlocks.length) return;
  
      var navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 72;
  
      function getActiveYear() {
        var active = null;
        yearBlocks.forEach(function (block) {
          var rect = block.getBoundingClientRect();
          if (rect.top <= navH + 40) {
            active = block.id; // e.g. "y2025"
          }
        });
        return active;
      }
  
      function updatePills() {
        var activeId = getActiveYear();
        pills.forEach(function (pill) {
          var href = pill.getAttribute('href'); // e.g. "#y2025"
          if (href && href === '#' + activeId) {
            pill.classList.add('year-pill--active');
          } else {
            pill.classList.remove('year-pill--active');
          }
        });
      }
  
      window.addEventListener('scroll', updatePills, { passive: true });
      updatePills(); // initial call
    }
  
    /* ─────────────────────────────────────────────
       3. SMOOTH SCROLL FOR YEAR PILLS
          (native scroll-behavior may already handle
           this, but we also open the accordion)
    ───────────────────────────────────────────── */
    function initPillClick() {
      var navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 72;
  
      document.querySelectorAll('.year-pill').forEach(function (pill) {
        pill.addEventListener('click', function (e) {
          var href = this.getAttribute('href');
          if (!href || href === '#') return;
  
          var target = document.querySelector(href);
          if (!target) return;
  
          e.preventDefault();
  
          // Auto-open accordion for target year
          var header = target.querySelector('.year-header');
          if (header) {
            var targetId = header.getAttribute('data-target');
            var docs     = targetId ? document.getElementById(targetId) : null;
            if (docs && docs.classList.contains('year-docs--closed')) {
              header.click();
            }
          }
  
          // Scroll after a tiny delay (let accordion expand first)
          setTimeout(function () {
            var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }, 50);
        });
      });
    }
  
    /* ─────────────────────────────────────────────
       BOOT
    ───────────────────────────────────────────── */
    function init() {
      initAccordion();
      initYearPillHighlight();
      initPillClick();
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();