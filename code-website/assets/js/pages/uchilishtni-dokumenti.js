/**
 * dokumenti.js — страница-специфична логика за страницата с документи
 * Зависи от: main.js (initNav, initMobileMenu, initReveal) зареден преди това
 *
 * Тук се добавя само логика, специфична за тази страница.
 * Навигацията, мобилното меню и reveal анимациите се управляват от main.js.
 */

/**
 * Инициализира hover ефекта на doc-card.
 * (CSS върши по-голямата работа; тук може да се добавят бъдещи JS интеракции)
 */
function initDocCards() {
    const cards = document.querySelectorAll('.doc-card');
  
    cards.forEach(card => {
      // Ако картата е просто линк без реален href, спираме default поведението
      card.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
          e.preventDefault();
          // TODO: замени с реален PDF линк или покажи tooltip/modal
          console.info('Документът все още няма прикачен файл:', this.querySelector('.doc-name')?.textContent);
        }
      });
    });
  }
  
  // Стартиране след зареждане на DOM-а
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocCards);
  } else {
    initDocCards();
  }