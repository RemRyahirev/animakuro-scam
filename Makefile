# генерирует клиента Prisma на основе схемы (schema.prisma).
gen:
	npx prisma generate

# синхронизирует состояние схемы Prisma с БД без выполнения миграций
push:
	npx prisma db push

# заполнить таблицы данными
seed:
	npx prisma db seed

# веб-интерфейс Prisma
studio:
	npx prisma studio
