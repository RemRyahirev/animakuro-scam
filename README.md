# Animakuro backend 

## Requirements:
1.	Redis
2.	MySQL/MariaDB
3.	SMTP credentials

## Run

### Setup dev environment
```shell
npx prisma migrate dev --name migration-name
npx prisma generate
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