import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

export async function genreSeed(prisma: PrismaClient) {
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

// перенёс промис в index.ts
// genreSeed()
//     .catch((e) => console.error(e))
//     .finally(async () => await prisma.$disconnect());
