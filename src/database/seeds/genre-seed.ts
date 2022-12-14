import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function genreSeed() {
    console.log(`Start seeding genre...`);
    await prisma.genre.createMany({
        skipDuplicates: true,
        data: [
            {
                id: '84c12417-e25e-4e9f-9755-dc0795d30532',
                genre_name: 'Fantasy',
            },
            {
                id: 'cd5d7441-123f-4a5b-b971-3d2cf1217f0a',
                genre_name: 'Drama',
            },
            {
                id: '31e2c060-ff08-4a90-83ca-a5f19c3c382f',
                genre_name: 'Detective',
            },
        ],
    });
    console.log(`Seeding genre finished.`);
}

genreSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
