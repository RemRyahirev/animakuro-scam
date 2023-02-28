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
# api service
pnpm dev
# statistic service
pnpm dev:stat
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

### Build
```shell
# api service
pnpm build # or pnpm build api
# statistic service
pnpm build statistic
```

For build docker image is needed to pass build arg `SERVICE`.
Possible values:
- `api` [default]
- `statistic`

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
- register
Принимает данные пользователя и отправляет ему на почту письмо с редиректом на https://context.req.headers.host/token,
нужно достать оттуда token и отправить его в мутацию emailConfirmation, тогда зарегестрируется новый пользователь.
- logout 
Запрос в бд о том, что пользователь вышел.
- login
Принимает username и пароль, если они верны, то возвращает юзера и токен.
- registerSocial
при переходе по ссылкам из .env вида SERVICE_CALLBACK_URL и подтверждении авторизации возвращает пользователя и токен.
