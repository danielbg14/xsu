// konsultacii.js — page-specific logic

// Tab switching for consultation terms
window.switchTerm = function (event) {
    const termId = event.target.getAttribute('data-term');
  
    document.querySelectorAll('.term-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.consultations-table-wrapper').forEach(w => w.classList.remove('active'));
  
    event.target.classList.add('active');
    const target = document.querySelector(`[data-term-content="${termId}"]`);
    if (target) target.classList.add('active');
  };