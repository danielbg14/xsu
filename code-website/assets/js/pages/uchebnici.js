// ============================================================
// assets/js/pages/virtualna-razhodka.js
// Интерактивна виртуална разходка — стаи, галерия, авто-тур
// ============================================================

(function () {
    'use strict';
  
    const rooms = [
      {
        id: 0, label: 'Поглед отвън', title: 'Фасада и двор', badge: 'Начална точка',
        desc: 'Добре дошли в СУ „Йордан Йовков“! Разгледайте фасадата на нашето училище и просторния двор, където учениците прекарват почивките си. Сградата предлага отлични условия за образование.',
        features: ['Просторен двор', 'Спортна площадка', 'Зелени площи', 'Паркинг'],
        emoji: ['🏫', '🌳', '⚽'], tourUrl: null
      },
      {
        id: 1, label: 'Учебна дейност', title: 'Класна стая', badge: 'I–XII клас',
        desc: 'Нашите класни стаи са просветли, удобни и оборудвани с модерни учебни помагала. Интерактивни дъски, проектори и комфортни чинове създават идеална среда за учене.',
        features: ['Интерактивна дъска', 'Проектор', 'Климатик', 'Натурална светлина'],
        emoji: ['📖', '✏️', '📐'], tourUrl: null
      },
      {
        id: 2, label: 'Учебна дейност', title: 'Компютърен кабинет', badge: 'ИТ & Програмиране',
        desc: 'Модерно оборудван компютърен кабинет с нови машини и бърз интернет. Тук се провеждат часовете по информационни технологии и програмиране за паралелката „Интелигентни системи".',
        features: ['30 работни места', 'Бърз интернет', 'Нови компютри', 'Специализиран софтуер'],
        emoji: ['💻', '🖥️', '⌨️'], tourUrl: null
      },
      {
        id: 3, label: 'Учебна дейност', title: 'Кабинети по науки', badge: 'Физика · Химия · Биология',
        desc: 'Напълно оборудвани лаборатории за практически опити по физика, химия и биология. Учениците провеждат реални експерименти в безопасна и съвременна среда.',
        features: ['Лабораторно оборудване', 'Демонстрационна маса', 'Защитно оборудване', 'Реактиви и препарати'],
        emoji: ['🔬', '⚗️', '🧪'], tourUrl: null
      },
      {
        id: 4, label: 'Спорт', title: 'Физкултурен салон', badge: 'Спорт & Здраве',
        desc: 'Просторен физкултурен салон с модерен инвентар за различни спортове. Провеждат се часове по физическо възпитание, спортни секции и училищни шампионати.',
        features: ['Паркет под', 'Оборудване за гимнастика', 'Баскетбол & Волейбол', 'Съблекални'],
        emoji: ['🏃', '⚽', '🏀'], tourUrl: null
      },
      {
        id: 5, label: 'Изкуство & Тържества', title: 'Актова зала', badge: 'Сцена & Концерти',
        desc: 'Красива актова зала с голяма сцена и зрителна зала. Тук се провеждат училищни тържества, театрални представления, концерти и официални събития.',
        features: ['Голяма сцена', 'Озвучителна система', 'Прожекционен екран', '300 места'],
        emoji: ['🎭', '🎤', '🎬'], tourUrl: null
      },
      {
        id: 6, label: 'Изкуство', title: 'Творческо ателие', badge: 'Извънкласни дейности',
        desc: 'Пространство за творческо изразяване — рисуване, приложни изкуства и ръчна изработка. Извънкласните дейности тук развиват артистичните таланти на учениците.',
        features: ['Арт материали', 'Грънчарско колело', 'Изложбено пространство', 'Студио'],
        emoji: ['🎨', '✂️', '🖌️'], tourUrl: null
      },
      {
        id: 7, label: 'Общи пространства', title: 'Библиотека', badge: 'Знание & Четене',
        desc: 'Уютна библиотека с богат книжен фонд — художествена литература, учебници и справочна литература. Компютърни места за онлайн достъп до ресурси и тиха зона за самоподготовка.',
        features: ['5000+ книги', 'Компютри с интернет', 'Тиха зона', 'Читалня'],
        emoji: ['📚', '📖', '🗂️'], tourUrl: null
      },
      {
        id: 8, label: 'Общи пространства', title: 'Стол / Бюфет', badge: 'Хранене & Почивка',
        desc: 'Светлото и чисто хранилище предлага разнообразно и балансирано меню всеки ден. Уютното пространство е любимо място за учениците по време на обедната почивка.',
        features: ['Топла храна', 'Разнообразно меню', 'Чисто пространство', 'Бюфет с лека закуска'],
        emoji: ['🍽️', '🥗', '☕'], tourUrl: null
      },
      {
        id: 9, label: 'Администрация', title: 'Канцелария', badge: 'Администрация',
        desc: 'Административният център на училището — тук се обработват документи, приема се прием на ученици и родители. Достъпно работно място с приветливи служители.',
        features: ['Прием пон–пет', '07:30 – 19:00', 'Документи & Прием', 'Консултации'],
        emoji: ['🏢', '📋', '🖊️'], tourUrl: null
      }
    ];
  
    let currentRoom = 0;
    let autoTourInterval = null;
    let isAutoTour = false;
  
    // ---- Internal helpers ----
  
    function buildProgressDots() {
      const c = document.getElementById('progressDots');
      if (!c) return;
      c.innerHTML = '';
      rooms.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'progress-dot' + (i === 0 ? ' active' : '');
        c.appendChild(d);
      });
    }
  
    function buildGallery(room) {
      const c = document.getElementById('galleryThumbs');
      if (!c) return;
      c.innerHTML = '';
      const count = Math.max(room.emoji.length, 4);
      for (let i = 0; i < count; i++) {
        const thumb = document.createElement('div');
        thumb.className = 'thumb' + (i === 0 ? ' active' : '');
        const inner = document.createElement('div');
        inner.className = 'thumb-placeholder';
        inner.textContent = room.emoji[i % room.emoji.length] || '📷';
        thumb.appendChild(inner);
        thumb.addEventListener('click', () => {
          c.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
        c.appendChild(thumb);
      }
    }
  
    function selectRoom(idx) {
      currentRoom = idx;
      const room = rooms[idx];
  
      document.querySelectorAll('.room-btn').forEach((btn, i) => btn.classList.toggle('active', i === idx));
  
      const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      setText('roomLabel', room.label);
      setText('roomTitle', room.title);
      setText('roomBadge', room.badge);
      setText('roomDesc', room.desc);
      setText('placeholderTitle', room.title);
      setText('placeholderDesc', `Панорамен изглед на „${room.title}". Вградете вашия TourMKR iframe тук.`);
      setText('roomCounter', `${idx + 1} / ${rooms.length}`);
  
      const featuresEl = document.getElementById('roomFeatures');
      if (featuresEl) featuresEl.innerHTML = room.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
  
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === rooms.length - 1;
  
      document.querySelectorAll('.progress-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  
      buildGallery(room);
  
      if (window.innerWidth < 900) {
        const viewer = document.getElementById('tourViewer');
        if (viewer) viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  
    // ---- Public API (called from onclick in HTML) ----
  
    window.selectRoom = selectRoom;
  
    window.prevRoom = function () {
      if (currentRoom > 0) selectRoom(currentRoom - 1);
    };
  
    window.nextRoom = function () {
      if (currentRoom < rooms.length - 1) selectRoom(currentRoom + 1);
    };
  
    window.toggleAutoTour = function () {
      isAutoTour ? stopAutoTour() : startAutoTour();
    };
  
    function startAutoTour() {
      isAutoTour = true;
      const btn = document.getElementById('autoTourBtn');
      if (btn) btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Пауза`;
      selectRoom(0);
      autoTourInterval = setInterval(() => {
        currentRoom < rooms.length - 1 ? selectRoom(currentRoom + 1) : stopAutoTour();
      }, 4000);
    }
  
    function stopAutoTour() {
      isAutoTour = false;
      clearInterval(autoTourInterval);
      const btn = document.getElementById('autoTourBtn');
      if (btn) btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><polygon points="5 3 19 12 5 21 5 3"/></svg> Обиколи с нас`;
    }
  
    window.requestFullscreen = function () {
      const v = document.getElementById('tourViewer');
      if (!v) return;
      if (v.requestFullscreen) v.requestFullscreen();
      else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
    };
  
    window.shareRoom = function () {
      const room = rooms[currentRoom];
      if (navigator.share) {
        navigator.share({ title: `СУ „Йордан Йовков“ – ${room.title}`, url: window.location.href });
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => alert('Линкът е копиран!'));
      }
    };
  
    // ---- Init ----
    buildProgressDots();
    selectRoom(0);
  })();