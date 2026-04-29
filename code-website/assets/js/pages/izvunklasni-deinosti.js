// izvunklasni-deinosti.js — page-specific logic

// Sub-tab switching for extracurricular activity categories
const subBtns = document.querySelectorAll('.sub-tab-btn');
const subPanels = document.querySelectorAll('.sub-panel');

subBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    subBtns.forEach(b => b.classList.remove('active'));
    subPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById('sub-' + btn.dataset.sub);
    if (panel) panel.classList.add('active');

    const content = document.querySelector('.ext-content');
    if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});