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

### Tests
```shell
# unit tests single run
pnpm test
# unit tests with watch mode
pnpm test:dev
# gather unit tests coverage
pnpm test:cov
# e2e tests single run
pnpm test:e2e
```

## Errors

### Error codes
- GRAPHQL_PARSE_FAILED - bad query string (eg: missed braces)
- GRAPHQL_VALIDATION_FAILED - bad query content (eg: bad field name) 
- BAD_USER_INPUT - bad values + validation decorator errors 
- PERSISTED_QUERY_NOT_FOUND
- PERSISTED_QUERY_NOT_SUPPORTED
- OPERATION_RESOLUTION_FAILURE
- BAD_REQUEST
- INTERNAL_SERVER_ERROR - runtime error or bad user input that caused Prisma to fail

### Error response format

```json5
{
  errors: [
    {
      // short error description
      message: 'Parameter validation error',
      // which position in query caused the error
      location: {
        line: 3,
        column: 29,
      },
      // on what path error occurred
      path: 'animeQueries.getAnimeList',
      // predefined token from previous section
      code: 'BAD_USER_INPUT',
      // additional info
      // - in case of validation errors here is array of hints
      // - in case of prisma client errors here is map of arguments for message
      details: [
        'page must be a positive number',
        'perPage must be a positive number',
      ],
    },
  ],
}
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
