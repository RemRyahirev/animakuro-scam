import { PrismaClient } from '@prisma/client';
import {
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
} from '../../common/models/enums';

const prisma = new PrismaClient();

async function animeSeed() {
    console.log(`Start seeding anime...`);
    const genreList = await prisma.genre.findMany();
    console.log(genreList);
    await prisma.anime.create({
        data: {
            id: 'eae8238a-7aec-11ed-a453-020017000b7b',
            title: 'Гуррен-лаганн',
            score: 4.7,
            year: 2010,
            genres: {
                connect: [
                    {
                        id: '84c12417-e25e-4e9f-9755-dc0795d30532'
                    }
                ]
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
            characters: [],
            authors: [],
        },
        include: {
            genres: true,
        },
    });
    // await prisma.anime.createMany({
    //     skipDuplicates: true,
    //     data: [
    //         {
    //             id: 'eae8238a-7aec-11ed-a453-020017000b7b',
    //             title: 'Гуррен-лаганн',
    //             score: 4.7,
    //             year: 2010,
    //             // genres: ['84c12417-e25e-4e9f-9755-dc0795d30532'],
    //             media_format: MediaFormat.OTHER,
    //             source: MediaSource.OTHER,
    //             studio_id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
    //             seasons_count: 3,
    //             episodes_count: 6,
    //             duration: 13000,
    //             next_episode: new Date('2004-10-19 10:23:54'),
    //             rating: FilmRating.R,
    //             description: 'аниме про лагман',
    //             preview_link: 'https://google.com',
    //             status_description: 'в 2006-2007гг',
    //             release_status: ReleaseStatus.FINISHED,
    //             characters: [],
    //             authors: [],
    //         },
    //         {
    //             id: 'f2d82632-d15d-496f-a45b-dd57b1297f6e',
    //             title: 'Стальной алхимик',
    //             score: 6.9,
    //             year: 1999,
    //             // genres: [
    //             //     'cd5d7441-123f-4a5b-b971-3d2cf1217f0a',
    //             //     '31e2c060-ff08-4a90-83ca-a5f19c3c382f',
    //             // ],
    //             media_format: MediaFormat.MOVIE,
    //             source: MediaSource.GAME,
    //             studio_id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
    //             seasons_count: 1,
    //             episodes_count: 10,
    //             duration: 22000,
    //             next_episode: new Date('2020-10-19 10:23:54'),
    //             rating: FilmRating.R,
    //             description: 'про малыша в доспехах',
    //             preview_link: 'https://yandex.com',
    //             status_description: 'в 1999-2001 гг',
    //             release_status: ReleaseStatus.FINISHED,
    //             characters: [],
    //             authors: [],
    //         },
    //     ],
    // });
    console.log(`Seeding anime finished.`);
}

animeSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
