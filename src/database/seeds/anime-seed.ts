import { PrismaClient } from "@prisma/client";
import { FilmRating, MediaFormat, MediaSource, ReleaseStatus } from "../../common/models/enums";

//const prisma = new PrismaClient();

export async function animeSeed(prisma: PrismaClient) {
    console.log(`Start seeding anime...`);
    const genreList = await prisma.genre.findMany();
    const authorList = await prisma.author.findMany();
    const characterList = await prisma.character.findMany();
    if (
        !genreList.length ||
        !authorList.length ||
        !characterList.length
    ) {
        console.error(
            'Seed genres, characters and authors before seeding anime, 3 entities in each list',
        );
        return;
    }

    const [genre1, genre2, genre3] = genreList;
    const [author1, author2, author3] = authorList;
    const [character1, character2, character3] = characterList;

    const animeData = [
        {
            id: 'eae8238a-7aec-11ed-a453-020017000b7b',
            title: 'Гуррен-лаганн',
            score: 4.7,
            year: 2010,
            genres: {
                connect: [
                    {
                        id: genre1.id,
                    },
                ],
            },
            media_format: MediaFormat.OTHER,
            source: MediaSource.OTHER,
            studio_id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
            seasons_count: 3,
            episodes_count: 6,
            duration: 13000,
            next_episode: new Date('2004-10-19 10:23:54'),
            rating: FilmRating.R,
            description: 'аниме про лагман',
            preview_link: 'https://google.com',
            status_description: 'в 2006-2007гг',
            release_status: ReleaseStatus.FINISHED,
            characters: {
                connect: [
                    {
                        id: character1.id
                    },
                ]
            },
            authors: {
                connect: [
                    {
                        id: author1.id
                    },
                    {
                        id: authorList[1].id
                    }
                ]
            },
        }, {
            id: "f2d82632-d15d-496f-a45b-dd57b1297f6e",
            title: 'Стальной алхимик',
            score: 6.9,
            year: 1999,
            genres: {
                connect: [
                    {
                        id: genre2.id,
                    },
                    {
                        id: genre3.id,
                    },
                ],
            },
            media_format: MediaFormat.MOVIE,
            source: MediaSource.GAME,
            studio_id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
            seasons_count: 1,
            episodes_count: 10,
            duration: 22000,
            next_episode: new Date('2020-10-19 10:23:54'),
            rating: FilmRating.R,
            description: 'про малыша в доспехах',
            preview_link: 'https://yandex.com',
            status_description: 'в 1999-2001 гг',
            release_status: ReleaseStatus.FINISHED,
            characters: {
                connect: [
                    {
                        id: character2.id
                    },
                ]
            },
            authors: {
                connect: [
                    {
                        id: author3.id
                    },
                ]
            },
        }
    ];
    animeData.map(async (item) => {
        await prisma.anime.create({
            data: item,
            include: {
               genres: true,
                authors: true,
                characters: true
            },
        });
    });
    console.log(`Seeding anime finished.`);
}

// перенёс промис в index.ts
// animeSeed()
//     .catch((e) => console.error(e))
//     .finally(async () => await prisma.$disconnect());
