# Этап 1: Сборка приложения
FROM node:18 AS build
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код и собираем приложение
COPY . .
RUN npm run build

# Этап 2: Минимальный образ для раздачи статики
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Удаляем стандартные файлы Nginx
RUN rm -rf ./*

# Копируем файлы сборки из предыдущего этапа
COPY --from=build /app/dist .

# Копируем пользовательский конфиг Nginx, если он есть
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Контейнер будет слушать HTTP-запросы
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
