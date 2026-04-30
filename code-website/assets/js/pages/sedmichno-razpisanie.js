(function () {
  'use strict';

  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.class-panel');

  // ---- Animate rows inside the active panel ----
  function animatePanel(panel) {
    // Header
    const header = panel.querySelector('.class-header');
    if (header) {
      header.style.opacity = '0';
      header.style.transform = 'translateY(-16px)';
      requestAnimationFrame(() => {
        header.style.transition = 'opacity .35s ease, transform .35s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      });
    }

    // Table wrap slides in
    const tableWrap = panel.querySelector('.schedule-table-wrap');
    if (tableWrap) {
      tableWrap.style.opacity = '0';
      tableWrap.style.transform = 'translateY(24px)';
      setTimeout(() => {
        tableWrap.style.transition = 'opacity .4s ease, transform .4s ease';
        tableWrap.style.opacity = '1';
        tableWrap.style.transform = 'translateY(0)';
      }, 60);
    }

    // Table rows stagger in
    const rows = panel.querySelectorAll('.schedule-table tbody tr');
    rows.forEach((row, i) => {
      row.style.opacity = '0';
      row.style.transform = 'translateX(-12px)';
      setTimeout(() => {
        row.style.transition = `opacity .3s ease ${i * 35}ms, transform .3s ease ${i * 35}ms`;
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      }, 120 + i * 35);
    });

    // Notes slide up
    const notes = panel.querySelector('.schedule-notes');
    if (notes) {
      const delay = 120 + rows.length * 35 + 60;
      notes.style.opacity = '0';
      notes.style.transform = 'translateY(12px)';
      setTimeout(() => {
        notes.style.transition = 'opacity .35s ease, transform .35s ease';
        notes.style.opacity = '1';
        notes.style.transform = 'translateY(0)';
      }, delay);
    }
  }

  // ---- Switch panel ----
  function switchTo(panelId) {
    // Deactivate all
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => {
      p.classList.remove('active');
      // Reset inline styles so re-animation works on revisit
      const rows = p.querySelectorAll('.schedule-table tbody tr');
      rows.forEach(r => { r.style.transition = 'none'; r.style.opacity = ''; r.style.transform = ''; });
    });

    // Activate selected tab
    const activeBtn = document.querySelector(`.tab-btn[data-panel="${panelId}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Activate panel & animate
    const activePanel = document.getElementById('panel-' + panelId);
    if (activePanel) {
      activePanel.classList.add('active');
      animatePanel(activePanel);

      // Smooth scroll to schedule area (not all the way to top)
      const content = document.querySelector('.schedule-content');
      if (content) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const tabsH = document.querySelector('.tabs-wrapper')?.offsetHeight || 52;
        const top = content.getBoundingClientRect().top + window.scrollY - navH - tabsH - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  // ---- Bind clicks ----
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTo(btn.dataset.panel));
  });

  // ---- Cell hover highlight (column) ----
  // Highlights entire column on td hover so you can track the day
  const table = document.querySelector('.schedule-table');
  function attachColumnHighlight(panel) {
    const tbl = panel.querySelector('.schedule-table');
    if (!tbl) return;

    tbl.addEventListener('mouseover', e => {
      const td = e.target.closest('td');
      if (!td) return;
      const idx = td.cellIndex;
      if (idx < 2) return; // skip hour & time columns
      tbl.querySelectorAll(`td:nth-child(${idx + 1})`).forEach(cell => {
        cell.classList.add('col-highlight');
      });
    });

    tbl.addEventListener('mouseout', e => {
      const td = e.target.closest('td');
      if (!td) return;
      tbl.querySelectorAll('.col-highlight').forEach(cell => {
        cell.classList.remove('col-highlight');
      });
    });
  }

  panels.forEach(p => attachColumnHighlight(p));

  // ---- Inject column highlight CSS ----
  const style = document.createElement('style');
  style.textContent = `
    .schedule-table td.col-highlight {
      background: rgba(29, 122, 80, 0.06) !important;
      transition: background .15s;
    }

    /* Panel enter animation base state — only reset via JS, but provide smooth defaults */
    .class-panel { animation: none; }

    /* Tab active indicator underline slide */
    .tab-btn {
      position: relative;
      overflow: hidden;
    }
    .tab-btn::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 3px;
      background: var(--green);
      border-radius: 2px;
      transform: translateX(-50%);
      transition: width .25s cubic-bezier(.4,0,.2,1);
    }
    .tab-btn.active::after {
      width: 100%;
    }
    /* Override existing border-bottom approach so ::after handles it */
    .tab-btn.active {
      border-bottom-color: transparent !important;
    }

    /* Badge pulse on panel load */
    @keyframes badge-pop {
      0%   { transform: scale(.75); opacity: 0; }
      60%  { transform: scale(1.1); }
      100% { transform: scale(1);   opacity: 1; }
    }
    .class-panel.active .class-badge {
      animation: badge-pop .4s cubic-bezier(.34,1.56,.64,1) both;
    }

    /* Table wrap shadow lift */
    .schedule-table-wrap {
      transition: box-shadow .3s;
    }
    .schedule-table-wrap:hover {
      box-shadow: 0 8px 36px rgba(0,0,0,.13) !important;
    }

    /* Row hover accent */
    .schedule-table tbody tr:not(.extended-row):hover td {
      background: rgba(29,122,80,.045) !important;
    }
    .schedule-table tbody tr:not(.extended-row):hover td:first-child {
      background: rgba(29,122,80,.09) !important;
    }

    /* Notes fade-in handled by JS; ensure it starts visible if JS fails */
    .schedule-notes {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // ---- Init: animate whichever panel starts active ----
  const initPanel = document.querySelector('.class-panel.active');
  if (initPanel) {
    // Small delay so CSS is ready
    setTimeout(() => animatePanel(initPanel), 80);
  }

})(); 