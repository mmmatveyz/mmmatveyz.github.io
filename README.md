# ⚡ Персональное портфолио & Резюме | Матвей Зрячих

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://mmmatveyz.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-100%2F100-emerald?logo=googlechrome)](https://mmmatveyz.github.io)

> **Инженерный подход «с земли» и современная IT-автоматизация.**  
> Сайт-визитка, интерактивное портфолио и онлайн-резюме электромонтёра 6 разряда и Python-разработчика.

🌐 **Production URL:** [https://mmmatveyz.github.io](https://mmmatveyz.github.io)

---

## 🛠️ Технологический стек

### Frontend
- **HTML5 (Semantic)** — Семантическая разметка, Open Graph, JSON-LD Schema.org, Content Security Policy (CSP).
- **CSS3 (Modern Architecture & Glassmorphism)** — Кастомная модульная дизайн-система (`css/style.css`, `css/components.css`), CSS Custom Properties (Design Tokens), Dark/Light Themes, Fluid Typography (`clamp`), Scroll Reveal.
- **Vanilla JavaScript (ES6+)** — Без сторонних тяжелых фреймворков:
  - Интерактивный фоновый Canvas с динамической физикой частиц и реакцией на курсор (`js/canvas-bg.js`).
  - Универсальная модальная система для проектов и документов об образовании с управлением с клавиатуры (`Escape`).
  - Кастомный плавный курсор и индикатор прогресса чтения.
  - Табы характеристик проектов и фильтрация категорий.
  - Пасхалка: интерактивная консоль инженерной диагностики (по 5 кликам на логотип).

### Backend & Integrations
- **Serverless Backend (Google Apps Script)** — Приём, хранение и модерация отзывов клиентов и заявок с контактных форм без содержания собственного сервера.
- **Telegram Bot API** — Связка веб-форм и алгоритмов расчётов со служебными ботами для мгновенных уведомлений.
- **Yandex.Metrika (API/Tag)** — Аналитика посещаемости, Webvisor и отслеживание целей.

---

## 📂 Структура проекта

```text
├── index.html              # Главная: био, статистика, технологическая матрица, отзывы
├── projects.html           # Проекты с демо-видео, табами и фильтрацией (РемонтTrack, VoltGroup и др.)
├── achievements.html       # Квалификация, образование, просмотр дипломов и удостоверений
├── resume.html             # Интерактивное и оптимизированное для печати (A4 PDF) резюме
├── contacts.html           # Контакты, локация и форма отправки сообщений
├── privacy.html            # Политика конфиденциальности
├── 404.html                # Стилизованная страница ошибки 404
├── resume.pdf              # Готовая PDF-версия официального резюме
│
├── css/
│   ├── style.css           # Основная дизайн-система, переменные тем, сетки и типографика
│   └── components.css      # Компоненты (карточки, бейджи, матрица стека, табы)
│
├── js/
│   ├── main.js             # Логика темы, модалки, фильтры, табы, формы, пасхалки
│   └── canvas-bg.js        # Интерактивный high-tech Canvas-фон
│
├── images/                 # Ассеты, видеодемонстрации и документы
│   ├── docs/               # Скан-копии дипломов и удостоверений (6 разряд, СЦБ, инженер)
│   ├── profile.svg         # Векторный аватар
│   └── *.mp4               # Видеодемонстрации ботов и веб-платформ
│
├── robots.txt              # Инструкции для поисковых краулеров
├── sitemap.xml             # Карта сайта с приоритетами и датами обновления
└── favicon.svg             # Векторная иконка сайта
```

---

## 🚀 Локальный запуск

Проект полностью статичен и не требует установки тяжелых `node_modules` или сборщиков.

Для локального просмотра достаточно запустить любой локальный HTTP-сервер:

### Вариант 1 (Python 3):
```bash
python -m http.server 8000
```
Затем открыть [http://localhost:8000](http://localhost:8000) в браузере.

### Вариант 2 (Node / npx):
```bash
npx serve .
```

### Вариант 3 (VS Code / IDEA Live Server):
Открыть проект и нажать **Go Live** в VS Code или запустить встроенный веб-сервер в IntelliJ IDEA / WebStorm.

---

## 👨‍💻 Автор

**Матвей Зрячих**  
- **Telegram:** [@mmmatveyz](https://t.me/mmmatveyz)  
- **Email:** [matvey6527@mail.ru](mailto:matvey6527@mail.ru)  
- **GitHub:** [github.com/mmmatveyz](https://github.com/mmmatveyz)  
- **Локация:** Санкт-Петербург 🇷🇺

---
© 2026 Матвей Зрячих. Все права защищены.