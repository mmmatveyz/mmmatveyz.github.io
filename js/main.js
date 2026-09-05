// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 💎 1. Логика переключения темы со сменой SVG-иконок ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const sunIconSvg = `<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIconSvg = `<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? sunIconSvg : moonIconSvg;
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
        }
    }

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // --- 💎 2. Универсальное модальное окно (Проекты и Документы) ---
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-card">
            <button class="modal-close" aria-label="Закрыть модальное окно">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <h2 class="card-title" id="modal-title" style="font-size: var(--text-2xl); margin-top: 4px;"></h2>
            <div class="card-tech" id="modal-tech" style="margin: var(--space-sm) 0 var(--space-md);"></div>
            <div class="modal-body">
                <div id="modal-image-wrapper" style="display: none; margin-bottom: var(--space-md); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); background: #000;">
                    <img id="modal-image" src="" alt="Документ" style="width: 100%; height: auto; max-height: 480px; object-fit: contain; display: block;" loading="lazy">
                </div>
                <p class="card-text" id="modal-desc" style="font-size: var(--text-base);"></p>
                <div id="modal-extra" style="color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.6;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalImageWrapper = document.getElementById('modal-image-wrapper');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-desc');
    const modalExtra = document.getElementById('modal-extra');
    const modalClose = modalOverlay.querySelector('.modal-close');

    function closeModal() {
        modalOverlay.classList.remove('active');
        if (modalImage) modalImage.src = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // --- 💎 2.1 Открытие проектов в модальном окне ---
    const projectDetails = {
        'РемонтTrack': {
            title: 'РемонтTrack',
            tech: ['Python', 'Aiogram', 'SQLite', 'sentence-transformers'],
            desc: 'Полнофункциональный Telegram-бот для автоматизации учёта ремонтов оборудования на промышленном предприятии.',
            extra: '<strong>Архитектура и особенности:</strong> Реализован семантический поиск неисправностей с использованием эмбеддингов (paraphrase-multilingual-MiniLM-L12-v2), что позволяет находить похожие поломки даже при разной формулировке текста. Ведется строгая ролевая модель доступа (инженеры, слесари, администраторы) и детальная статистика простоев оборудования.'
        },
        'WorkTimeBot': {
            title: 'WorkTimeBot',
            tech: ['Python', 'python-telegram-bot', 'SQLite', 'openpyxl'],
            desc: 'Инструмент автоматизации фиксации рабочего времени и генерации официальных отчетов для бухгалтерии.',
            extra: '<strong>Архитектура и особенности:</strong> Бот парсит сообщения из рабочего чата, автоматически распознавая смены, перерывы и сверхурочные часы сотрудников. С помощью библиотеки openpyxl на выходе формируется готовый табель учета рабочего времени в формате Excel, экономящий часы рутинной работы.'
        },
        'VoltGroup': {
            title: 'VoltGroup',
            tech: ['JavaScript', 'Telegram API', 'Калькулятор смет', 'HTML5 / CSS3', 'SEO'],
            desc: 'Веб-платформа для компании VoltGroup (Санкт-Петербург) с интерактивным расчётом стоимости работ и сквозной автоматизацией процессов.',
            extra: '<strong>Инженерные решения и ключевой функционал:</strong><br>' +
            '• <strong>Сложный калькулятор смет:</strong> интерактивный алгоритм расчёта стоимости электромонтажа в зависимости от площади, типа помещения, количества точек и материалов.<br>' +
            '• <strong>Интеграция с Telegram-ботом:</strong> мгновенное уведомление мастеров в рабочий чат при отправке заявки или готового расчёта с сайта.<br>' +
            '• <strong>Ведение карточек объектов:</strong> структура для наглядной презентации выполненных объектов с этапами работ и техническими деталями.<br><br>' +
            '<a href="https://voltgroup-spb.ru" target="_blank" style="color: var(--accent-secondary); text-decoration: underline; font-weight: 500;">Перейти на voltgroup-spb.ru &rarr;</a>'
        },
        'Персональное портфолио': {
            title: 'Персональное портфолио',
            tech: ['JavaScript', 'Google Apps Script', 'CSS3', 'Яндекс.Метрика'],
            desc: 'Интективный сайт-визитка для демонстрации инженерных проектов и связи с клиентами.',
            extra: '<strong>Архитектура и особенности:</strong> Полностью собственный Frontend без громоздких фреймворков. В качестве бесплатной серверлесс-БД используется Google Apps Script (прием отзывов, хранение, статусы модерации). Интегрированы кастомный курсор, динамическая фильтрация, переключатель темы и аналитика Яндекс.Метрики.'
        }
    };

    const projectCardsList = document.querySelectorAll('.projects-grid .card');
    projectCardsList.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;

            const titleEl = card.querySelector('.card-title');
            if (!titleEl) return;

            const cardKey = Object.keys(projectDetails).find(key => titleEl.textContent.includes(key));

            if (cardKey && projectDetails[cardKey]) {
                const data = projectDetails[cardKey];
                modalTitle.textContent = data.title;
                modalTech.style.display = 'flex';
                modalTech.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
                modalImageWrapper.style.display = 'none';
                modalDesc.textContent = data.desc;
                modalExtra.innerHTML = data.extra;

                modalOverlay.classList.add('active');
            }
        });
    });

    // --- 💎 2.2 Открытие документов и дипломов в модальном окне ---
    const docButtons = document.querySelectorAll('.doc-modal-btn');
    docButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const title = btn.getAttribute('data-doc-title') || 'Документ об образовании';
            const imgSrc = btn.getAttribute('data-doc-img');
            const desc = btn.getAttribute('data-doc-desc') || '';

            modalTitle.textContent = title;
            modalTech.style.display = 'none';
            modalDesc.textContent = desc;
            modalExtra.innerHTML = '';

            if (imgSrc) {
                modalImage.src = imgSrc;
                modalImageWrapper.style.display = 'block';
            } else {
                modalImageWrapper.style.display = 'none';
            }

            modalOverlay.classList.add('active');
        });
    });

    // --- 📜 Модальное окно просмотра документов ---
    const docOverlay = document.createElement('div');
    docOverlay.className = 'modal-overlay doc-modal-overlay';
    docOverlay.innerHTML = `
        <div class="modal-card doc-modal-card" style="max-width: 800px; padding: var(--space-lg);">
            <button class="modal-close doc-modal-close" aria-label="Закрыть">&times;</button>
            <h3 class="card-title" id="doc-modal-title" style="margin-bottom: var(--space-md); font-size: var(--text-lg);"></h3>
            <div style="text-align: center; overflow: hidden;">
                <img src="" alt="Документ" id="doc-modal-img" style="max-width: 100%; max-height: 75vh; border-radius: var(--radius-md); box-shadow: 0 8px 24px var(--color-shadow); object-fit: contain;">
            </div>
        </div>
    `;
    document.body.appendChild(docOverlay);

    const docModalTitle = document.getElementById('doc-modal-title');
    const docModalImg = document.getElementById('doc-modal-img');
    const docModalClose = docOverlay.querySelector('.doc-modal-close');

    function closeDocModal() {
        docOverlay.classList.remove('active');
    }

    if (docModalClose) docModalClose.addEventListener('click', closeDocModal);
    docOverlay.addEventListener('click', (e) => {
        if (e.target === docOverlay) closeDocModal();
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.doc-modal-btn');
        if (btn) {
            e.preventDefault();
            const src = btn.getAttribute('data-doc-src') || btn.getAttribute('href');
            const title = btn.getAttribute('data-doc-title') || 'Просмотр документа';

            docModalTitle.textContent = title;
            docModalImg.src = src;
            docOverlay.classList.add('active');
        }
    });

    // --- Установка текущего года в футере ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- 💎 4. Мобильное меню ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isActive = nav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });
    }

    // --- 💎 5. Активная ссылка в меню ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // --- 💎 6. Scroll Reveal (Плавное появление) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 💎 7. Баннер согласия с Cookie ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted') && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.add('active');
        }, 1000);
    } else if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.opacity = '0';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        });
    }

    // --- 💎 8. Индикатор прогресса чтения ---
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // --- 💎 9. Кастомный курсор ---
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const clickables = document.querySelectorAll('a, button, .card, input, textarea, select');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // --- 🗂️ Табы внутри карточек проектов ---
    document.querySelectorAll('.card').forEach(card => {
        const tabBtns = card.querySelectorAll('.project-tab-btn');
        const tabPanes = card.querySelectorAll('.tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetTab = btn.getAttribute('data-tab');

                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const activePane = card.querySelector(`.tab-pane[data-pane="${targetTab}"]`);
                if (activePane) activePane.classList.add('active');
            });
        });
    });

    // --- 🗂️ Фильтрация портфолио ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // --- 💎 11. Пасхалка: Инженерная консоль диагностики ---
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    let clickTimer;

    if (logo) {
        logo.addEventListener('click', (e) => {
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                e.preventDefault();
            }

            clickCount++;
            clearTimeout(clickTimer);

            if (clickCount >= 5) {
                activateDiagnosticsMode();
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => { clickCount = 0; }, 400);
            }
        });
    }

    function activateDiagnosticsMode() {
        const terminal = document.createElement('div');
        terminal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(8, 11, 17, 0.96); color: #34d399; font-family: var(--font-mono); font-size: 1rem;
            padding: 2.5rem; z-index: 999999; box-sizing: border-box; overflow: hidden;
            cursor: pointer; backdrop-filter: blur(12px);
        `;
        document.body.appendChild(terminal);

        const lines = [
            "[SYSTEM DIAGNOSTICS: INITIALIZED]",
            "Checking kernel modules... OK",
            "Connecting to industrial PLC nodes... OK",
            "Sinumerik 840D telemetry stream active.",
            "Loading Telegram bot microservices... OK",
            "Vector search embeddings (MiniLM-L12) loaded.",
            "Status: All systems operational. Designed & built by Matvey Zryachikh.",
            "[Click anywhere to return to interface]"
        ];

        let delay = 0;
        lines.forEach((line, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.style.margin = '8px 0';
                p.textContent = '> ' + line;
                terminal.appendChild(p);
            }, delay);
            delay += (index >= lines.length - 2) ? 900 : 400;
        });

        terminal.addEventListener('click', () => {
            terminal.remove();
        });
    }
});
