# ✅ Checklist Backend Tasteorama

## 🔹 Приоритет выполнения

1. **Базовая настройка**

   - Развернуть сервер (Express, dotenv, cors, morgan)
   - Настроить CORS
   - Сделать обработчик ошибок
   - Подключить MongoDB
   - Создать структуру проекта (routes, controllers, models, middlewares, utils)

2. **Auth**

   - POST `/register`
   - POST `/login`
   - Middleware `auth`
   - POST `/logout`

3. **Users**

   - GET `/current`

4. **Categories & Ingredients**

   - GET `/categories`
   - GET `/ingredients`

5. **Recipes**

   - GET `/search`
   - GET `/:id`
   - POST `/` (добавление своего рецепта)
   - GET `/own` (мои рецепты)
   - POST `/favorites/:id` (добавить в избранное)
   - DELETE `/favorites/:id` (убрать из избранного)
   - GET `/favorites` (список избранных)

6. **Доп. задачи**
   - DELETE `/:id` – удалить свой рецепт
   - Логика удаления, если рецепт в избранных у других пользователей

---
