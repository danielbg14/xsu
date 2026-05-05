const MOBILE_BREAKPOINT = 768;
const MOBILE_DEFAULT_ITEMS = 3;

const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

const normalize = (value) => value.trim().toLowerCase();

const newsGrid = document.getElementById('newsGrid');
const categorySelect = document.getElementById('newsCategorySelect');

if (newsGrid && categorySelect) {
  const cards = Array.from(newsGrid.querySelectorAll('.news-card'));

  const sortedCards = [...cards].sort((a, b) => {
    const aDate = new Date(a.dataset.date || 0).getTime();
    const bDate = new Date(b.dataset.date || 0).getTime();
    return bDate - aDate;
  });

  // Render cards in newest-first order once.
  sortedCards.forEach((card) => newsGrid.appendChild(card));

  const categories = Array.from(
    new Set(
      sortedCards
        .map((card) => card.querySelector('.tag')?.textContent || '')
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = normalize(category);
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  const applyMobileFilter = () => {
    if (!isMobile()) {
      sortedCards.forEach((card) => {
        card.style.display = '';
      });
      return;
    }

    const selected = categorySelect.value;
    let shownCount = 0;

    sortedCards.forEach((card) => {
      const cardTag = normalize(card.querySelector('.tag')?.textContent || '');
      const matchesCategory = selected === 'all' || cardTag === selected;

      if (matchesCategory && shownCount < MOBILE_DEFAULT_ITEMS) {
        card.style.display = '';
        shownCount += 1;
      } else {
        card.style.display = 'none';
      }
    });
  };

  categorySelect.addEventListener('change', applyMobileFilter);
  window.addEventListener('resize', applyMobileFilter);
  applyMobileFilter();
}
