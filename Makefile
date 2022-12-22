# генерирует клиента Prisma на основе схемы (schema.prisma):
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

# приводит схему призмы в красивый вид + добавляет недостающие связи:
format:
	npx prisma format

# миграция схемы с дефолтным именем
mig:
	npx prisma migrate dev --name nextMigrate

migResetWithSeed:
	npx prisma migrate reset --preview-feature

migResetNoSeed:
	npx prisma migrate reset --preview-feature --skip-seed
