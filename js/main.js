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
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" style="max-width: 820px; max-height: 90vh; overflow-y: auto;">
            <button class="modal-close" aria-label="Закрыть модальное окно">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <h2 class="card-title" id="modal-title" style="font-size: var(--text-2xl); margin-top: 4px;"></h2>
            <div class="card-tech" id="modal-tech" style="margin: var(--space-sm) 0 var(--space-md);"></div>
            <div class="modal-body">
                <div id="modal-image-wrapper" style="display: none; margin-bottom: var(--space-md); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); background: rgba(0, 0, 0, 0.4); text-align: center;">
                    <img id="modal-image" src="" alt="Документ" style="width: 100%; height: auto; max-height: 70vh; object-fit: contain; display: block; margin: 0 auto;" loading="lazy">
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

    function openModal() {
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (modalImage) modalImage.src = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
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
            '<a href="https://voltgroup-spb.ru" target="_blank" rel="noopener noreferrer" style="color: var(--accent-secondary); text-decoration: underline; font-weight: 500;">Перейти на voltgroup-spb.ru &rarr;</a>'
        },
        'Персональное портфолио': {
            title: 'Персональное портфолио',
            tech: ['JavaScript', 'Google Apps Script', 'CSS3', 'Яндекс.Метрика'],
            desc: 'Интерактивный сайт-визитка для демонстрации инженерных проектов и связи с клиентами.',
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
                modalDesc.style.display = 'block';
                modalExtra.innerHTML = data.extra;

                openModal();
            }
        });
    });

    // --- 💎 2.2 Открытие документов и дипломов в модальном окне ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.doc-modal-btn');
        if (btn) {
            e.preventDefault();
            const title = btn.getAttribute('data-doc-title') || 'Документ об образовании';
            const src = btn.getAttribute('data-doc-src') || btn.getAttribute('data-doc-img') || btn.getAttribute('href');
            const desc = btn.getAttribute('data-doc-desc') || '';

            modalTitle.textContent = title;
            modalTech.style.display = 'none';
            modalDesc.textContent = desc;
            modalDesc.style.display = desc ? 'block' : 'none';
            modalExtra.innerHTML = '';

            if (src) {
                modalImage.src = src;
                modalImageWrapper.style.display = 'block';
            } else {
                modalImageWrapper.style.display = 'none';
            }

            openModal();
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

    if (acceptCookiesBtn && cookieBanner) {
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
        if (windowHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        const scrolled = Math.min(Math.max((window.scrollY / windowHeight) * 100, 0), 100);
        progressBar.style.width = scrolled + '%';
    });

    // --- 💎 9. Кастомный курсор ---
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.opacity = '1';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
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

    // --- 🎥 Оптимизация воспроизведения видео при скролле ---
    const projectVideos = document.querySelectorAll('.project-screenshot video');
    if (projectVideos.length > 0 && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.15 });

        projectVideos.forEach(video => videoObserver.observe(video));
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

    // --- ⌨️ Typewriter эффект без обрезания слов ---
    const typewriterEl = document.querySelector('.typewriter');
    if (typewriterEl) {
        const fullText = typewriterEl.getAttribute('data-text') || typewriterEl.textContent.trim();
        typewriterEl.textContent = '';

        const textSpan = document.createElement('span');
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        cursor.textContent = '|';
        typewriterEl.appendChild(textSpan);
        typewriterEl.appendChild(cursor);

        let charIndex = 0;
        function typeChar() {
            if (charIndex < fullText.length) {
                textSpan.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 30);
            }
        }
        setTimeout(typeChar, 350);
    }

    // --- 💎 12. Отзывы (Загрузка и карусель) ---
    const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbxrBExj_TvpbnR4Yd2Q8kvxtmKHyOLMH25m1E9v80xo3Pl7RDaNoMf_4OOhfIX8RJhR/exec';
    const pageLoadTimestamp = Date.now();

    const reviewsContainer = document.getElementById('testimonials-list');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    function getStarsSvg(count) {
        const starsCount = Math.min(Math.max(parseInt(count, 10) || 5, 1), 5);
        const starSvg = `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        return starSvg.repeat(starsCount);
    }

    function scrollContainer(direction) {
        if (!reviewsContainer) return;
        const scrollAmount = reviewsContainer.clientWidth;
        reviewsContainer.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => scrollContainer('left'));
        scrollRightBtn.addEventListener('click', () => scrollContainer('right'));
    }

    function loadReviews() {
        if (!reviewsContainer) return;
        fetch(googleAppScriptUrl)
            .then(response => response.json())
            .then(data => {
                reviewsContainer.innerHTML = '';
                if (!Array.isArray(data) || data.length === 0) {
                    reviewsContainer.innerHTML = '<p class="card-text">Пока нет отзывов. Будьте первым!</p>';
                    return;
                }
                const recentReviews = data.slice().reverse();
                recentReviews.forEach(review => {
                    const card = document.createElement('div');
                    card.className = 'card testimonial-card';

                    const safeName = String(review.name || 'Пользователь').trim();
                    const safeRole = String(review.role || '').trim();
                    const safeText = String(review.text || '').trim();
                    const initial = (safeName.charAt(0) || 'U').toUpperCase();

                    const headerDiv = document.createElement('div');
                    headerDiv.className = 'testimonial-header';

                    const avatarDiv = document.createElement('div');
                    avatarDiv.className = 'testimonial-avatar';
                    avatarDiv.textContent = initial;

                    const infoDiv = document.createElement('div');
                    const nameEl = document.createElement('h4');
                    nameEl.className = 'testimonial-name';
                    nameEl.textContent = safeName;
                    infoDiv.appendChild(nameEl);

                    if (safeRole) {
                        const roleEl = document.createElement('p');
                        roleEl.className = 'testimonial-role';
                        roleEl.textContent = safeRole;
                        infoDiv.appendChild(roleEl);
                    }

                    headerDiv.appendChild(avatarDiv);
                    headerDiv.appendChild(infoDiv);

                    const textEl = document.createElement('p');
                    textEl.className = 'testimonial-text';
                    textEl.textContent = `"${safeText}"`;

                    const ratingEl = document.createElement('div');
                    ratingEl.className = 'testimonial-rating';
                    ratingEl.innerHTML = getStarsSvg(review.stars);

                    card.appendChild(headerDiv);
                    card.appendChild(textEl);
                    card.appendChild(ratingEl);

                    reviewsContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Ошибка загрузки отзывов:', error);
                reviewsContainer.innerHTML = '<p class="card-text">Не удалось загрузить отзывы.</p>';
            });
    }

    if (reviewsContainer) {
        loadReviews();
    }

    // --- 💎 13. Обработка форм с антиспамом (Honeypot + Time-gate + предотвращение дублирования) ---
    function setupForm(formId, successMsgText) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 🛡️ Антиспам-проверка 1: Honeypot ловушка
            const trap = form.querySelector('input[name="_hp_trap"]');
            if (trap && trap.value.trim() !== '') {
                console.warn('Bot submission blocked.');
                form.reset();
                return;
            }

            // 🛡️ Антиспам-проверка 2: Time-gate (блокировка мгновенной бот-отправки)
            if (Date.now() - pageLoadTimestamp < 1500) {
                console.warn('Submission too fast, blocked.');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalContent = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
            }

            // Удаляем старое сообщение о статусе
            const existingMsg = form.parentNode.querySelector('.form-status-msg');
            if (existingMsg) existingMsg.remove();

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'cors'
            }).then(() => {
                const msg = document.createElement('div');
                msg.className = 'form-status-msg card-text mt-sm';
                msg.style.color = '#34d399';
                msg.style.fontFamily = 'var(--font-mono)';
                msg.style.fontSize = 'var(--text-sm)';
                msg.textContent = successMsgText;
                form.parentNode.insertBefore(msg, form.nextSibling);

                form.reset();
                if (submitBtn) {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                }

                if (formId === 'reviewForm') {
                    setTimeout(loadReviews, 1500);
                }
            }).catch(error => {
                console.error('Ошибка отправки:', error);
                const msg = document.createElement('div');
                msg.className = 'form-status-msg card-text mt-sm';
                msg.style.color = '#f87171';
                msg.style.fontFamily = 'var(--font-mono)';
                msg.style.fontSize = 'var(--text-sm)';
                msg.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.';
                form.parentNode.insertBefore(msg, form.nextSibling);

                if (submitBtn) {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                }
            });
        });
    }

    setupForm('reviewForm', 'Отзыв успешно опубликован.');
    setupForm('contactForm', 'Сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.');
});
