function markActiveNavLink() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
  
    const mo = new MutationObserver(() => {
      if (!navbarContainer.innerHTML.trim()) return;
      mo.disconnect();
  
      document.querySelectorAll('.nav-links a, .nav-item > a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        const text = link.textContent.trim();
        if (
          href.includes('roditelski-sreshti') ||
          text === 'Родителски срещи' ||
          text === 'Родители'
        ) {
          link.classList.add('active');
        }
      });
    });
  
    mo.observe(navbarContainer, { childList: true, subtree: true });
  }
  
  /**
   * Анимира .meeting-card елементите с staggered delay.
   * Работи с .meeting-card (не с .reveal) — без конфликт с reveal.js.
   */
  function initMeetingCardReveal() {
    const cards = document.querySelectorAll('.meeting-card');
    if (!cards.length) return;
  
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity .5s ${i * 0.07}s, transform .5s ${i * 0.07}s`;
    });
  
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
  
    cards.forEach(card => observer.observe(card));
  }
  
  /**
   * Таб превключване — Всички / Предстоящи / Минали.
   */
  function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const groups = document.querySelectorAll('.meetings-group[data-filter]');
  
    if (!tabs.length) return;
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Active state на таба
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
  
        const filter = tab.dataset.tab;
  
        // Показваме/скриваме групи
        groups.forEach(group => {
          const show = filter === 'all' || group.dataset.filter === filter;
          group.style.display = show ? '' : 'none';
        });
  
        // Скриваме divider-ите ако всичко е скрито под тях
        document.querySelectorAll('.meetings-divider').forEach(div => {
          div.style.display = filter === 'all' ? '' : 'none';
        });
      });
    });
  }
  
  /**
   * Countdown таймер до следващата среща.
   * Взима датата от data-next-meeting атрибута на .next-meeting-banner.
   */
  function initCountdown() {
    const banner = document.querySelector('.next-meeting-banner[data-next-meeting]');
    if (!banner) return;
  
    const target = new Date(banner.dataset.nextMeeting);
  
    function tick() {
      const now = new Date();
      const diff = target - now;
  
      if (diff <= 0) {
        document.getElementById('cd-days').textContent  = '0';
        document.getElementById('cd-hours').textContent = '0';
        document.getElementById('cd-mins').textContent  = '0';
        document.getElementById('cd-secs').textContent  = '0';
        return;
      }
  
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000)  / 60000);
      const secs  = Math.floor((diff % 60000)    / 1000);
  
      document.getElementById('cd-days').textContent  = days;
      document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
      document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
    }
  
    tick();
    setInterval(tick, 1000);
  }
  
  /**
   * Инициализация.
   */
  function init() {
    markActiveNavLink();
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initTabs();
        initCountdown();
        initMeetingCardReveal();
      });
    } else {
      initTabs();
      initCountdown();
      initMeetingCardReveal();
    }
  }
  
  init();