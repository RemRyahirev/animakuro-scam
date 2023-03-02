import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userFoldersData = async () => {
    const userList = await prisma.user.findMany();
    const animeList = await prisma.anime.findMany();
    const fileList = await prisma.file.findMany();
    if (!userList.length || !animeList.length) {
        throw new Error('Either User or Anime table is empty or not available');
    }

    const [anime1, anime2, anime3, anime4, anime5, anime6] = animeList;
    const [user1, user2, user3, user4] = userList;
    const [file1, file2, file3, file4] = fileList;
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
            id: 'c892938b-ac27-3lm4-hb65-2aacfb9a2f66',
            description: 'Сборник Аниме которые я смотрю',
            user_collection_id: user1.id,
            user_id: user1.id,
            user_favourite_collections_id: user1.id,
            hashtags: ['ANIME', "Like"],
            name: 'Аниме которые я смотрю',
            type: 'DEFAULT',
            is_public: true,
            is_collection: true,
            thumbnail_id: file1.id,
            animes: {
                connect: [
                    {
                        id: anime3.id,
                    },
                    {
                        id: anime1.id,
                    },
                    {
                        id: anime2.id,
                    },
                    {
                        id: anime4.id,
                    },
                ],
            },
        },
        {
            id: 'c892938b-ac27-4ae2-bh7h-2aacfb9a2f32',
            description: 'Сборник моих любимых аниме',
            user_collection_id: user2.id,
            user_id: user2.id,
            user_favourite_collections_id: user2.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме',
            type: 'DEFAULT',
            thumbnail_id: file4.id,
            is_public: true,
            is_collection: true,
            animes: {
                connect: [
                    {
                        id: anime4.id,
                    },
                    {
                        id: anime5.id,
                    },
                    {
                        id: anime6.id,
                    },
                ],
            },
        },
        {
            id: 'c892938b-ac27-4ae2-mk8k-2aacfb9a2f32',
            description: 'Сборник моих любимых аниме',
            user_collection_id: user4.id,
            user_id: user4.id,
            user_favourite_collections_id: user4.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме',
            type: 'DEFAULT',
            is_public: true,
            thumbnail_id: file2.id,
            is_collection: true,
            animes: {
                connect: [
                    {
                        id: anime6.id,
                    },
                    {
                        id: anime2.id,
                    },
                    {
                        id: anime1.id,
                    },
                ],
            },
        },
        {
            id: 'c892938b-ac27-7bf8-ac4f-2aacfb9a2f32',
            description: 'Сборник моих любимых аниме',
            user_collection_id: user1.id,
            user_id: user1.id,
            user_favourite_collections_id: user1.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме',
            thumbnail_id: file1.id,
            type: 'DEFAULT',
            is_public: true,
            is_collection: true,
            animes: {
                connect: [
                    {
                        id: anime5.id,
                    },
                    {
                        id: anime3.id,
                    },
                    {
                        id: anime1.id,
                    },
                ],
            },
        },
        {
            id: 'c892938b-bb73-4ae2-ac4f-2aacfb9a2f32',
            description: 'Сборник моих любимых аниме',
            user_collection_id: user3.id,
            user_id: user3.id,
            user_favourite_collections_id: user3.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме',
            thumbnail_id: file3.id,
            type: 'DEFAULT',
            is_public: true,
            is_collection: true,
            animes: {
                connect: [
                    {
                        id: anime1.id,
                    },
                    {
                        id: anime6.id,
                    },
                    {
                        id: anime4.id,
                    },
                ],
            },
        },
    ];
};
