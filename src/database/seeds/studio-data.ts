import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const studioData = async () => {
    return [
        {
            id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
            createdAt: new Date(Date.now()),
            studio_name: 'Anime International',
            rating: 3.2,
            thumbnail: 'https://foo.bar.jpg',
        },
    ];
};

export const studioDependencies = async () => {
    const animeList = await prisma.anime.findMany();
    return [
        {
            id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
            anime: {
                connect: [
                    {
                        id: animeList[0].id,
                    },
                    {
                        id: animeList[1].id,
                    },
                ],
            },
        },
    ];
};
