import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const studioData = async () => {
    return [
        {
            id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
            created_at: new Date(Date.now()),
            name: 'Anime International',
            rating: 3.2,
            thumbnail: 'https://foo.bar.jpg',
            anime_count: 2,
            anime_starts: 1999,
            anime_ends: 2010,
        },
        {
            id: '9acd2bf7-6fcf-4648-bd03-5e6dbf68a244',
            created_at: new Date(Date.now()),
            name: 'Anime China',
            rating: 5.4,
            thumbnail: 'https://foo.else.jpg',
            anime_count: 1,
            anime_starts: 1999,
            anime_ends: 2010,
        },
        {
            id: '48117d7a-5946-4940-937c-d733d8d46e3f',
            created_at: new Date('2015-04-20'),
            name: 'Bandai Namco Pictures',
            rating: 7.8,
            thumbnail: 'https://bandai-namco.png',
            anime_count: 49,
            anime_starts: 2015,
            anime_ends: 2023,
        },
        {
            id: 'bfa55967-e6dc-4a22-a763-acf08b9a8ae1',
            created_at: new Date('1946-10-10'),
            name: 'TMS Entertainment',
            rating: 8.5,
            thumbnail: 'https://tms-ent.jpg',
            anime_count: 277,
            anime_starts: 1973,
            anime_ends: 2023,
        },
        {
            id: '0a0beac9-7395-4383-b894-b55f7263824e',
            created_at: new Date('1979-04-12'),
            name: 'Studio Pierrot',
            rating: 5.8,
            thumbnail: 'https://studio-pierr.png',
            anime_count: 63,
            anime_starts: 1974,
            anime_ends: 2023,
        },
        {
            id: 'e34522f4-6656-4d97-a0f5-728089494bef',
            created_at: new Date('1972-10-17'),
            name: 'Madhouse',
            rating: 7.5,
            thumbnail: 'https://madhouse.png',
            anime_count: 261,
            anime_starts: 1973,
            anime_ends: 2023,
        },
        {
            id: '2a968ac7-b82a-41ce-beb6-25f790a4b31b',
            created_at: new Date('1998-07-06'),
            name: 'Actas',
            rating: 8.1,
            thumbnail: 'https://actas.jpg',
            anime_count: 28,
            anime_starts: 1999,
            anime_ends: 2023,
        },
    ];
};

export const studioDependencies = async () => {
    const animeList = await prisma.anime.findMany();
    return [
        {
            id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
            animes: {
                set: [
                    {
                        id: animeList[0].id,
                    },
                    {
                        id: animeList[1].id,
                    },
                ],
            },
        },
        {
            id: '9acd2bf7-6fcf-4648-bd03-5e6dbf68a244',
            animes: {
                set: [
                    {
                        id: animeList[2].id,
                    },
                ],
            },
        },
        {
            id: '48117d7a-5946-4940-937c-d733d8d46e3f',
            animes: {
                set: [
                    {
                        id: animeList[3].id,
                    },
                    {
                        id: animeList[4].id,
                    },
                ],
            },
        },
        {
            id: 'bfa55967-e6dc-4a22-a763-acf08b9a8ae1',
            animes: {
                set: [
                    {
                        id: animeList[5].id,
                    },
                    {
                        id: animeList[6].id,
                    },
                ],
            },
        },
        {
            id: '0a0beac9-7395-4383-b894-b55f7263824e',
            animes: {
                set: [
                    {
                        id: animeList[7].id,
                    },
                    {
                        id: animeList[8].id,
                    },
                ],
            },
        },
        {
            id: 'e34522f4-6656-4d97-a0f5-728089494bef',
            animes: {
                set: [
                    {
                        id: animeList[9].id,
                    },
                    {
                        id: animeList[10].id,
                    },
                ],
            },
        },
        {
            id: '2a968ac7-b82a-41ce-beb6-25f790a4b31b',
            animes: {
                set: [
                    {
                        id: animeList[11].id,
                    },
                    {
                        id: animeList[12].id,
                    },
                ],
            },
        },
    ];
};
