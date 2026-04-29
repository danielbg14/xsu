/**
 * tabs.js — Универсален tab switcher
 *
 * Използва се на:
 *   dzi.html             — .session-tab / #tab-may, #tab-june
 *   dnevno-razpisanie.html — .grade-tab / .grade-content
 */

/**
 * Tab switcher за ДЗИ сесии
 * Бутоните са 2: [0]=май, [1]=юни
 */
export function initDziTabs() {
    const tabs = document.querySelectorAll('.session-tab');
    if (!tabs.length) return;
  
    window.switchTab = function (id) {
      tabs.forEach((t, i) => t.classList.toggle('active', i === (id === 'may' ? 0 : 1)));
      document.querySelectorAll('.session-content').forEach(c => c.classList.remove('active'));
      const target = document.getElementById('tab-' + id);
      if (target) target.classList.add('active');
    };
  }
  
  /**
   * Tab switcher за дневно разписание по клас
   */
  export function initGradeTabs() {
    const tabs = document.querySelectorAll('.grade-tab');
    if (!tabs.length) return;
  
    window.switchGrade = function (id) {
      tabs.forEach(t => t.classList.remove('active'));
      // маркира активния бутон чрез event.target (запазена съвместимост с inline onclick)
      if (event && event.target) event.target.classList.add('active');
      document.querySelectorAll('.grade-content').forEach(c => c.classList.remove('active'));
      const target = document.getElementById(id);
      if (target) target.classList.add('active');
    };
  }