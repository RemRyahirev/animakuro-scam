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
- Register - принимает аргумент типа RegisterInputType, отправляет письмо с подтверждением почты (перед этой функцией обязательно вызвать checkArgs, чтобы 
проверить введенные данные), нельзя регистрироваться чаще чем раз в 120 секунд
- Login - принимает аргумент типа LoginInputType, записывает сессию, отправляет письмо юзеру о входе, возвращает пользователя и токен(есть ограничение, нельзя логиниться чаще чем раз в 120 секунд)
- RegisterSocial - при переходе по ссылкам из контроллера(например localhost:8080/graphql/oauth/discord/redirect) перекидывает на сервис и дает возможность регаться
- LoginSocial - принимает токен, который вернула регистрация через RegisterSocial и тип авторизации, возвращает пользователя
- Logout - принимает токен, записывает в сессию logout и возвращает только success
- emailConfirmation - принимает токен, создает юзера и возвращает токен и юзера
- для регистрации через соц. сети нужно перенаправлять юзера на ссылки из .env.example файла с названием СЕРВИС_CALLBACK_URL