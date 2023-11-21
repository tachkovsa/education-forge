# Конструктор обучения

Данное приложение разрабатывается в рамках учебного проекта НИТУ МИСИС.

# Запуск для разработки
В `docker-compose.yml` прописана конфигурация для старта контейнеров в `Docker`.
Для корректной работы необходимо заполнить .env файл в корневой директории проекта, после чего запустить
скрипт для поднятия контейнеров.
```bash
docker compose up
```

Пример `.env` файла
```dotenv
COMPOSE_PROJECT_NAME=education-forge

POSTGRES_HOST=db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgrespw
POSTGRES_DB=education-forge
POSTGRES_PORT=5432

REDIS_PASSWORD=cJA6A53PL0bVorOf
REDIS_URI=redis://default:cJA6A53PL0bVorOf@cache:6379
```

# TODO:
- [x] Добавить поддержку Redis
- [ ] Перенести коды верификации в Redis
- [ ] Реализовать отправку кодов верификации через E-Mail
- [ ] Добавить роль эксперта
- [ ] Добавить функционал подтверждения РО экспертом
