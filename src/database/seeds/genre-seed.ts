import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function genreSeed() {
    console.log(`Start seeding genre...`);
    await prisma.genre.createMany({
        skipDuplicates: true,
        data: [
            {
                genre_name: 'Fantasy',
            },
            {
                genre_name: 'Drama',
            },
            {
                genre_name: 'Detective',
            },
        ],
    });
    console.log(`Seeding genre finished.`);
}

genreSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
