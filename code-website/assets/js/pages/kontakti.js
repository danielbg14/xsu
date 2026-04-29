// kontakti.js — page-specific logic

// Highlight today's working hours row
(function () {
    const dayMap = [null, 'hr-mon', 'hr-tue', 'hr-wed', 'hr-thu', 'hr-fri', null, null];
    const id = dayMap[new Date().getDay()];
    if (id) {
      const el = document.getElementById(id);
      if (el) el.classList.add('today');
    }
  })();
  
  // Copy email to clipboard
  window.copyEmail = function () {
    const email = 'info-2000114@edu.mon.bg';
    const showSuccess = () => {
      const el = document.getElementById('copySuccess');
      if (el) {
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 3000);
      }
    };
  
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(showSuccess).catch(() => {
        fallbackCopy(email);
        showSuccess();
      });
    } else {
      fallbackCopy(email);
      showSuccess();
    }
  };
  
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  
  // Contact form submit handler
  window.handleFormSubmit = function (e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Изпращане...';
    btn.disabled = true;
  
    setTimeout(() => {
      btn.textContent = 'Изпратено ✓';
      btn.style.background = '#12a063';
      const success = document.getElementById('formSuccess');
      if (success) success.style.display = 'flex';
      e.target.reset();
  
      setTimeout(() => {
        btn.textContent = 'Изпратете';
        btn.disabled = false;
        btn.style.background = '';
        if (success) success.style.display = 'none';
      }, 5000);
    }, 1200);
  };