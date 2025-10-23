# Noxer Shop - Интернет-магазин

React приложение для интернет-магазина Noxer с адаптивным дизайном и динамическим поиском товаров.

## 🚀 Технологии

- **React 18** с TypeScript
- **React Router** для навигации
- **Axios** для API запросов
- **CSS** без фреймворков (чистый CSS)
- **GitHub Pages** для хостинга

## 📱 Функционал

- ✅ Динамический поиск товаров по названию
- ✅ Автоматический поиск по фразам "Часто ищут"
- ✅ Фильтрация по категориям товаров
- ✅ Динамическая подгрузка товаров
- ✅ Адаптивный дизайн (360px - 600px+)

## 🔧 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build

# Развертывание на GitHub Pages
npm run deploy
```

## 🌐 API

Приложение использует API Noxer:

- `GET https://noxer-test.ru/webapp/api/products/on_main` - основные данные
- `POST https://noxer-test.ru/webapp/api/products/filter` - фильтрация товаров

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── ProductCard.tsx  # Карточка товара
│   ├── SearchBar.tsx    # Поисковая строка
│   ├── CategoryFilter.tsx # Фильтры категорий
│   └── ...
├── pages/              # Страницы приложения
│   ├── HomePage.tsx    # Главная страница
│   └── SearchPage.tsx  # Страница поиска
├── hooks/              # Пользовательские хуки
│   └── useProducts.ts  # Логика работы с товарами
├── services/           # API сервисы
│   └── api.ts          # HTTP клиент
├── types/              # TypeScript типы
│   └── index.ts        # Интерфейсы данных
└── utils/              # Утилиты
    └── dataTransform.ts # Преобразование данных
```
