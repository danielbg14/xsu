// Class tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.class-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel)?.classList.add('active');
    document.querySelector('.schedule-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});