// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 🌙 Логика тёмной темы ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        html.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        html.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            }
        });
    }

    // --- 🖼️ Модальные окна детальной информации о проектах ---
    // Создаем структуру модального окна динамически
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-card">
            <button class="modal-close" aria-label="Закрыть">&times;</button>
            <h2 class="card-title" id="modal-title" style="font-size: var(--text-2xl);"></h2>
            <div class="card-tech" id="modal-tech" style="margin: var(--space-sm) 0;"></div>
            <div class="modal-body">
                <p class="card-text" id="modal-desc" style="font-size: var(--text-base);"></p>
                <div id="modal-extra" style="color: var(--color-text-secondary); font-size: var(--text-sm);"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalDesc = document.getElementById('modal-desc');
    const modalExtra = document.getElementById('modal-extra');
    const modalClose = modalOverlay.querySelector('.modal-close');

    // Данные по всем проектам для модальных окон
    const projectDetails = {
        'РемонтTrack': {
            title: '🔧 РемонтTrack',
            tech: ['Python', 'Aiogram', 'SQLite', 'sentence-transformers'],
            desc: 'Полнофункциональный Telegram-бот для автоматизации учёта ремонтов оборудования на промышленном предприятии.',
            extra: '<strong>Архитектура и особенности:</strong> Реализован семантический поиск неисправностей с использованием эмбеддингов (paraphrase-multilingual-MiniLM-L12-v2), что позволяет находить похожие поломки даже при разной формулировке текста. Ведется строгая ролевая модель доступа (инженеры, слесари, администраторы) и детальная статистика простоев оборудования.'
        },
        'WorkTimeBot': {
            title: '⏱️ WorkTimeBot',
            tech: ['Python', 'python-telegram-bot', 'SQLite', 'openpyxl'],
            desc: 'Инструмент автоматизации фиксации рабочего времени и генерации официальных отчетов для бухгалтерии.',
            extra: '<strong>Архитектура и особенности:</strong> Бот парсит сообщения из рабочего чата, автоматически распознавая смены, перерывы и сверхурочные часы сотрудников. С помощью библиотеки openpyxl на выходе формируется готовый табель учета рабочего времени в формате Excel, экономящий часы рутинной работы.'
        },
        'VoltGroup': {
            title: '⚡ VoltGroup',
            tech: ['JavaScript', 'Telegram API', 'Калькулятор смет', 'HTML5/CSS3', 'SEO'],
            desc: 'Веб-платформа для компании VoltGroup (Санкт-Петербург) с интерактивным расчётом стоимости работ и сквозной автоматизацией процессов.',
            extra: '<strong>Инженерные решения и ключевой функционал:</strong><br>' +
            '• <strong>Сложный калькулятор смет:</strong> интерактивный алгоритм расчёта стоимости электромонтажа в зависимости от площади, типа помещения, количества точек и материалов.<br>' +
            '• <strong>Интеграция с Telegram-ботом:</strong> мгновенное уведомление мастеров в рабочий чат при отправке заявки или готового расчёта с сайта.<br>' +
            '• <strong>Ведение карточек объектов:</strong> структура для наглядной презентации выполненных объектов с этапами работ и техническими деталями.<br><br>' +
            '👉 <a href="https://voltgroup-spb.ru" target="_blank" style="color: var(--color-accent); text-decoration: underline;">Перейти на voltgroup-spb.ru</a>'
        },
        'Персональное портфолио': {
            title: '🌐 Персональное портфолио',
            tech: ['JavaScript', 'Google Apps Script', 'CSS3', 'Яндекс.Метрика'],
            desc: 'Интерактивный сайт-визитка для демонстрации инженерных проектов и связи с клиентами.',
            extra: '<strong>Архитектура и особенности:</strong> Полностью собственный Frontend без громоздких фреймворков. В качестве бесплатной серверлесс-БД используется Google Apps Script (прием отзывов, хранение, статусы модерации). Интегрированы кастомный курсор, динамическая фильтрация, переключатель темы и аналитика Яндекс.Метрики.'
        }
    };
    // Привязываем клик по карточкам проектов (если кликнули не по кнопкам)
    const projectCardsList = document.querySelectorAll('.projects-grid .card');
    projectCardsList.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Если кликнули на ссылки или кнопки внутри карточки — открывать модалку не нужно
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

            const titleEl = card.querySelector('.card-title');
            if (!titleEl) return;

            // Ищем чистое имя проекта (убираем эмодзи для поиска в словаре)
            const cardKey = Object.keys(projectDetails).find(key => titleEl.textContent.includes(key));

            if (cardKey && projectDetails[cardKey]) {
                const data = projectDetails[cardKey];
                modalTitle.textContent = data.title;
                modalTech.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
                modalDesc.textContent = data.desc;
                modalExtra.innerHTML = data.extra;

                modalOverlay.classList.add('active');
            }
        });
    });

    // Закрытие модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // --- Установка текущего года в футере ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Мобильное меню ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            nav.style.clipPath = expanded ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)';
        });
    }

    // --- Активная ссылка в меню ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // --- ✨ Анимация при скролле (Scroll Reveal) ---
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

    // --- 🍪 Логика cookie-баннера ---
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

    // --- 📊 Индикатор прогресса чтения ---
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

    // --- 🖱️ Кастомный курсор ---
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const clickables = document.querySelectorAll('a, button, .card, input, textarea');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

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
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => { card.style.display = 'none'; }, 400);
                    }
                });
            });
        });
    }

    // --- 🕵️‍♂️ Пасхалка: Хакерский терминал ---
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
                activateHackerMode();
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => { clickCount = 0; }, 400);
            }
        });
    }

    function activateHackerMode() {
        const terminal = document.createElement('div');
        terminal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #000; color: #10b981; font-family: monospace; font-size: 1.2rem;
            padding: 2rem; z-index: 999999; box-sizing: border-box; overflow: hidden;
            cursor: pointer;
        `;
        document.body.appendChild(terminal);

        const lines = [
            "INITIALIZING HACKER MODE...",
            "Bypassing security protocols...",
            "Accessing mainframe...",
            "Downloading sensitive data...",
            "Injecting Python scripts...",
            "Just kidding. You found the easter egg! 😎",
            "Click anywhere to close the terminal."
        ];

        let delay = 0;
        lines.forEach((line, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.style.margin = '10px 0';
                p.textContent = '> ' + line;
                terminal.appendChild(p);
            }, delay);
            delay += (index >= lines.length - 2) ? 1500 : 700;
        });

        terminal.addEventListener('click', () => {
            terminal.remove();
        });
    }
});