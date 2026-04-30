/**
 * formulari.js — Филтриране и търсене на формуляри
 */

(function () {
    const grid    = document.getElementById('formulariGrid');
    const empty   = document.getElementById('formulariEmpty');
    const emptyTerm = document.getElementById('emptyTerm');
    const searchInput = document.getElementById('formulariSearch');
    const filterTabs  = document.querySelectorAll('.filter-tab');
    const cards = Array.from(document.querySelectorAll('.formular-card'));
  
    let activeCat = 'all';
    let searchTerm = '';
  
    function applyFilters() {
      let visible = 0;
  
      cards.forEach(card => {
        const cat   = card.dataset.cat || '';
        const text  = card.innerText.toLowerCase();
        const matchCat  = activeCat === 'all' || cat === activeCat;
        const matchText = text.includes(searchTerm.toLowerCase());
  
        if (matchCat && matchText) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });
  
      if (visible === 0) {
        empty.style.display = 'block';
        emptyTerm.textContent = searchTerm || activeCat;
      } else {
        empty.style.display = 'none';
      }
    }
  
    // Tab filter
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCat = tab.dataset.cat;
        applyFilters();
      });
    });
  
    // Search filter
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value.trim();
        applyFilters();
      });
    }
  
    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
  })();