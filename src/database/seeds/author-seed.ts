import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function authorSeed() {
    console.log(`Start seeding authors...`);
    await prisma.author.createMany({
        skipDuplicates: true,
        data: [
            {
                author_name: 'Хаяо Миядзаки',
                bucket_id: 'd2c94865-3981-406b-a9e6-1f15a62019a1',
                bio: 'Всемирно известный японский автор аниме и манги',
            },
            {
                author_name: 'Харуки Мураками',
                bucket_id: 'd2c94865-7575-406b-a9e6-1f15a98364a1',
                bio: 'Об этом авторе не слышали разве что младенцы',
            }
        ],
    });
    console.log(`Seeding authors finished.`);
}

authorSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());