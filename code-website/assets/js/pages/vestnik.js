const ISSUES = [
  // Добавяй новите броеве най-отгоре в този масив.
  // След това качи PDF файла в проекта и посочи правилния път в `url`.
  // Пример:
  {
    title: 'Вестник „NewsGen AI“ – брой 1',
    date: 'Май 2026',
    description: 'Събития, интервюта и творби на ученици.',
    url: 'assets/documents/vestnik/vestnik-broi-1.pdf'
  }
];

function markActiveNavLink() {
  const links = document.querySelectorAll('.nav-links a, .nav-item > a, .mobile-submenu a');
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.includes('vestnik.html') || href.includes('dokumenti.html')) {
      link.classList.add('active');
    }
  });
}

function createIssueCard(issue) {
  return `
    <article class="issue-card">
      <span class="issue-date">${issue.date}</span>
      <h3 class="issue-title">${issue.title}</h3>
      <p class="issue-description">${issue.description || 'Електронно издание на училищния вестник.'}</p>
      <div class="issue-actions">
        <a class="issue-link open" href="${issue.url}" target="_blank" rel="noopener noreferrer">Отвори</a>
        <a class="issue-link download" href="${issue.url}" download="${issue.fileName || issue.title}.pdf">Изтегли</a>
      </div>
    </article>
  `;
}

function renderIssues() {
  const grid = document.getElementById('issuesGrid');
  if (!grid) return;

  if (!ISSUES.length) {
    grid.innerHTML = `
      <div class="empty-state">
        Все още няма добавени броеве.
      </div>
    `;
    return;
  }

  grid.innerHTML = ISSUES.map(createIssueCard).join('');
}

function init() {
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    const observer = new MutationObserver(() => {
      if (navbarContainer.innerHTML.trim()) {
        markActiveNavLink();
        observer.disconnect();
      }
    });
    observer.observe(navbarContainer, { childList: true, subtree: true });
  }

  renderIssues();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
