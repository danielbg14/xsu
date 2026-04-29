// TABS
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.class-section');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cls = tab.dataset.class;
        sections.forEach(s => {
            if (cls === 'all' || s.dataset.class === cls) {
                s.classList.remove('hidden')
            } else {
                s.classList.add('hidden')
            }
        });
        document.getElementById('searchInput').value = '';
        document.querySelectorAll('.book-card').forEach(c => c.classList.remove('search-hidden'));
        document.getElementById('noResults').style.display = 'none';
    });
});

// SEARCH
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    // reset class filter
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-class="all"]').classList.add('active');
    sections.forEach(s => s.classList.remove('hidden'));

    if (!q) {
        document.querySelectorAll('.book-card').forEach(c => c.classList.remove('search-hidden'));
        document.getElementById('noResults').style.display = 'none';
        return;
    }
    let anyVisible = false;
    sections.forEach(section => {
        const cards = section.querySelectorAll('.book-card');
        let sectionHasVisible = false;
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(q)) {
                card.classList.remove('search-hidden');
                sectionHasVisible = true;
                anyVisible = true
            } else {
                card.classList.add('search-hidden')
            }
        });
        section.classList.toggle('hidden', !sectionHasVisible);
    });
    document.getElementById('noResults').style.display = anyVisible ? 'none' : 'block';
});