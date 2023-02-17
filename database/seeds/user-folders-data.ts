import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userFoldersData = async () => {
    const userList = await prisma.user.findMany();
    const animeList = await prisma.anime.findMany();

    if (!userList.length || !animeList.length) {
        throw new Error('Either User or Anime table is empty or not available');
    }

    const [anime1, anime2] = animeList;
    const [user1, user2] = userList;

    return [
        {
            id: '809d1892-92fc-421d-9889-10e4be311057',
            user_id: user1.id,
            user_collection_id: user1.id,
            animes: {
                connect: { id: anime1.id },
            },
            name: 'Запланировано',
            description: 'Запланировал я эти аниме!',
            is_statistic_active: true,
            // информативный блок
        },
        {
            id: 'c892638f-bc77-4ae8-ac7f-2ffcfb9a2f32',
            user_id: user2.id,
            user_collection_id: user2.id,
            animes: {
                connect: { id: anime2.id },
            },
            // информативный блок
            // блок для аниме со статусом WATCHING
            name: 'Смотрю',
            description: 'Аниме я смотрю эти!',
            // episode: 2,
            //episode_duration: 1200,
            //watched_duration: 400,
        },
    ];
};
