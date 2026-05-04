/**
 * Mobile Menu Initialization
 * Handles opening/closing the mobile menu on hamburger click
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    menuOpen ? closeMenu() : openMenu();
  });

  // Close when clicking a link
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (menuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (menuOpen && e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuOpen) closeMenu();
  });

  mobileMenu.setAttribute('aria-hidden', 'true');
}

function normalizeSearchValue(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function initGlobalSearch() {
  const searchBtn = document.querySelector('#navbar .nav-search');
  const overlay = document.getElementById('navSearchOverlay');
  const form = document.getElementById('navSearchForm');
  const input = document.getElementById('navSearchInput');
  const closeBtn = document.getElementById('navSearchClose');
  const suggestionsBox = document.getElementById('navSearchSuggestions');
  if (!searchBtn || !overlay || !form || !input || !closeBtn || !suggestionsBox) return;

  const buildSearchIndex = () => {
    const anchors = Array.from(document.querySelectorAll('#navbar a, #mobileMenu a'));
    const byHref = new Map();

    anchors.forEach((a) => {
      const href = (a.getAttribute('href') || '').trim();
      const title = (a.textContent || '').replace(/\s+/g, ' ').trim();
      if (!href || !title) return;
      if (href.startsWith('#') || href.startsWith('http')) return;
      if (!href.endsWith('.html')) return;

      const normalizedHref = href.toLowerCase();
      if (!byHref.has(normalizedHref)) {
        const inSubmenu = Boolean(a.closest('.dropdown, .mobile-submenu'));
        const category = href.includes('priem')
          ? 'Прием'
          : inSubmenu
            ? 'Подстраници'
            : 'Основни';
        byHref.set(normalizedHref, {
          href,
          title,
          category,
          keywords: [title, href.replace('.html', '').replace(/[-_]/g, ' ')]
        });
      } else {
        byHref.get(normalizedHref).keywords.push(title);
      }
    });

    if (!byHref.has('index.html')) {
      byHref.set('index.html', {
        href: 'index.html',
        title: 'Начало',
        category: 'Основни',
        keywords: ['начало', 'home', 'училище']
      });
    }

    return Array.from(byHref.values());
  };

  const pages = buildSearchIndex();

  const getMatches = (raw) => {
    const query = normalizeSearchValue(raw || '');
    if (!query) return pages.slice(0, 10);
    return pages.filter((page) => {
      const titleMatch = normalizeSearchValue(page.title).includes(query);
      const keywordsMatch = page.keywords.some((key) =>
        normalizeSearchValue(key).includes(query) || query.includes(normalizeSearchValue(key))
      );
      return titleMatch || keywordsMatch;
    }).slice(0, 12);
  };

  const renderSuggestions = (raw) => {
    const matches = getMatches(raw);
    if (!matches.length) {
      suggestionsBox.innerHTML = '<div class="nav-search-empty">Няма намерени съвпадения.</div>';
      return;
    }
    const groupsOrder = ['Основни', 'Прием', 'Подстраници'];
    const grouped = new Map();
    matches.forEach((item) => {
      const key = item.category || 'Подстраници';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(item);
    });

    const html = groupsOrder
      .filter((groupName) => grouped.has(groupName))
      .map((groupName) => {
        const items = grouped.get(groupName) || [];
        const itemsHtml = items.map((item) => `
          <a class="nav-search-suggestion" href="${item.href}">
            <span class="nav-search-suggestion-title">${item.title}</span>
            <span class="nav-search-suggestion-arrow">→</span>
          </a>
        `).join('');
        return `
          <div class="nav-search-group">
            <div class="nav-search-group-title">${groupName}</div>
            ${itemsHtml}
          </div>
        `;
      }).join('');

    suggestionsBox.innerHTML = html;
  };

  const runSearch = (raw) => {
    const query = normalizeSearchValue(raw || '');
    if (!query) return;

    const match = pages.find((page) =>
      page.keywords.some((key) => normalizeSearchValue(key).includes(query) || query.includes(normalizeSearchValue(key)))
    );

    if (match) {
      window.location.href = match.href;
      return;
    }

    window.location.href = `novini.html?search=${encodeURIComponent(raw)}`;
  };

  const openSearch = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    renderSuggestions('');
    window.requestAnimationFrame(() => input.focus());
  };

  const closeSearch = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    form.reset();
    suggestionsBox.innerHTML = '';
  };

  searchBtn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch(input.value);
  });

  input.addEventListener('input', () => {
    renderSuggestions(input.value);
  });

  input.addEventListener('focus', () => {
    renderSuggestions(input.value);
  });

  suggestionsBox.addEventListener('click', (event) => {
    const link = event.target.closest('.nav-search-suggestion');
    if (!link) return;
    event.preventDefault();
    window.location.href = link.getAttribute('href');
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeSearch();
    }
  });
}

/**
 * toggleMobSub — Opens/closes submenu in mobile menu
 * Must be global because it's called with onclick="" in HTML
 */
window.toggleMobSub = function (btn) {
  const item = btn.closest('.mobile-menu-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.mobile-menu-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
};

/**
 * Initialize Components (Navbar and Footer)
 * Loads navbar and footer components into their respective containers
 */

async function loadComponents() {
  try {
    // Load Navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      const navbarResponse = await fetch('assets/components/navbar.html');
      const navbarHTML = await navbarResponse.text();
      navbarContainer.innerHTML = navbarHTML;
      
      // Initialize mobile menu after navbar is loaded
      initMobileMenu();
      initGlobalSearch();
    }

    // Load Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      const footerResponse = await fetch('assets/components/footer.html');
      const footerHTML = await footerResponse.text();
      footerContainer.innerHTML = footerHTML;
    }
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
