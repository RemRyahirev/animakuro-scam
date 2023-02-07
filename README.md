# Animakuro backend 

## Requirements:
1.	Redis
2.	PostgreSQL
3.	SMTP credentials

## Run

### Setup dev environment
```shell
npx prisma migrate dev --name migration-name
npx prisma generate
npx prisma db seed
```

### Seeding database
```shell
npx prisma db seed
```

### Start 
```shell
pnpm dev
```

## Todos
- Add auth middleware
- Add express request to graphQL ctx
- Solve issue with nanoid
- Write error handler and custom errors

## Docs for auth functions
- Mutations:
- Register - принимает аргумент типа RegisterInputType, возвращает созданного пользователя и его токен
- Login - принимает аргумент типа LoginInputType, записывает сессию, отправляет письмо юзеру о входе, возвращает пользователя и токен
- RegisterSocial - "For test only - need model adjust" - Виталий Кадыров, 23 января 2023 г.
- LoginSocial - принимает токен и тип авторизации, возвращает пользователя
- Logout - принимает токен, записывает в сессию logout и возвращает только success
- emailConfirmation - принимает токен, изменяет поле is_email_confirmed на true и возвращает токен типа EMAIL (нужна для подтверждения email)
- для регистрации через соц. сети нужно перенаправлять юзера на ссылки из .env.example файла с названием СЕРВИС_CALLBACK_URL