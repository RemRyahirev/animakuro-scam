import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const animeData: any[] = [
    {
        id: 'eae8238a-7aec-11ed-a453-020017000b7b',
        name: 'Гуррен-лаганн',
        score: 4.7,
        year: 2010,
        genres: [],
        type: 'OTHER',
        studio_id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
        seasons_count: 3,
        episodes_count: 6,
        total_duration: 13000,
        next_episode: new Date('2004-10-19 10:23:54'),
        film_rating: 'G',
        description: 'аниме про лагман',
        preview_link: 'https://google.com',
        status_description: 'в 2006-2007гг',
        release_status: 'RELEASED',
        characters: [],
        authors: [],
    }
];

const studioData: any[] = [
    {
        id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
        createdAt: new Date(Date.now()),
        studio_name: 'Oneme International',
        rating: 3.2,
        thumbnail: "https://foo.bar.jpg",
        anime: {create:[]}
    }
];


async function main() {
    console.log(`Start seeding ...`);

    for (const s of studioData) {
        const result = await prisma.studio.create({
            data: s
        })
        console.log(`Created studio with id: ${result.id}`);
    }

    for (const a of animeData) {
        const result = await prisma.anime.create({
            data: a
        })
        console.log(`Created anime with id: ${result.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
