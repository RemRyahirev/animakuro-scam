import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userFoldersData = async () => {
    const userList = await prisma.user.findMany();
    const animeList = await prisma.anime.findMany();

    if (!userList.length || !animeList.length) {
        throw new Error('Either User or Anime table is empty or not available');
    }

    const [anime1, anime2, anime3, anime4] = animeList;
    const [user1, user2, user3, user4] = userList;

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
            type: 'PLAN_TO_WATCH',
            // информативный блок
        },
        {
            id: 'c892638f-bc77-4ae8-ac7f-2ffcfb9a2f32',
            user_id: user2.id,
            user_collection_id: user2.id,
            animes: {
                connect: { id: anime2.id },
            },
            type: 'WATCHING',
            // информативный блок
            // блок для аниме со статусом WATCHING
            name: 'Смотрю',
            description: 'Аниме я смотрю эти!',
            // episode: 2,
            //episode_duration: 1200,
            //watched_duration: 400,
        },
        {
            id: 'c892938b-ac27-4ae2-ac4f-2aacfb9a2f32',
            description: 'Сборник моих любимых аниме',
            user_collection_id: user1.id,
            user_id: user1.id,
            user_favourite_collections_id: user1.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме',
            type: 'DEFAULT',
            is_public: true,
            is_collection: true,
            animes: [
                {
                    id: 'f2d82632-d15d-496f-a45b-dd57b1297f6e',
                },
                {
                    id: '1033dd1c-2401-402a-afd2-858e78eb7475',
                },
            ],
        },
    ];
};
