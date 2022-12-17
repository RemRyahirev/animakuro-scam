import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function studioSeed() {
    console.log(`Start seeding studio...`);
    const animeArray = await prisma.anime.findMany(); // TODO add array into 'anime' field
    await prisma.studio.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113', // было 'urn:uuid:ac9ab0e3-2d72-4e7c-9255-d1a20e49b113'
                createdAt: new Date(Date.now()),
                studio_name: 'Anime International',
                rating: 3.2,
                thumbnail: 'https://foo.bar.jpg',
                // anime: animeArray,
            },
        ],
    });
    console.log(`Seeding studio finished.`);
}

studioSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
