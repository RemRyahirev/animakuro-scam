import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

export async function translationSeed(prisma: PrismaClient) {
    console.log(`Start seeding translation...`);
    await prisma.translation.createMany({
        skipDuplicates: true,
        data: [
            {
                id: '84c12417-e25e-4e9f-9755-dc0795d30532',
                language: 'en_US',
                translation: 'Weathering with you',
            },
            {
                id: 'cd5d7441-123f-4a5b-b971-3d2cf1217f0a',
                language: 'ru_RU',
                translation: 'Дитя погоды',
            },
        ],
    });
    console.log(`Seeding translation finished.`);
}

// перенёс промис в index.ts
// translationSeed()
//     .catch((e) => console.error(e))
//     .finally(async () => await prisma.$disconnect());
