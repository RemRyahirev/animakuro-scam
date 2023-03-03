import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userFoldersData = async () => {
    const profileList = await prisma.userProfile.findMany();
    const animeList = await prisma.anime.findMany();
    const fileList = await prisma.file.findMany();

    if (!profileList.length || !animeList.length) {
        throw new Error('Either UserProfile or Anime table is empty or not available');
    }

    const [anime1, anime2, anime3, anime4, ] = animeList;
    const [profile1, profile2, profile3] = profileList;
    const [file1, file2, file3, file4] = fileList;

    return [
        {
            id: '809d1892-92fc-421d-9889-10e4be311057',
            user_profile_id: profile1.id,
            user_collection_id: profile1.id,
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
            id: 'c892956b-ac28-3aa4-ac65-2aacfb9a2f66',
            user_profile_id: profile2.id,
            user_collection_id: profile2.id,
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
            id: '94f587c2-9726-4e04-a1fe-3c06d7aae7c8',
            description: 'Сборник Аниме которые я смотрю',
            user_profile_id: profile1.id,
            user_collection_id: profile1.id,
            user_favourite_collections_id: profile1.id,
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
            id: '911a3565-431d-4b23-8c6c-46f30acb23ea',
            description: 'Сборник моих любимых аниме_1',
            user_profile_id: profile2.id,
            user_collection_id: profile2.id,
            user_favourite_collections_id: profile2.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме_1',
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
                        id: anime2.id,
                    },
                    {
                        id: anime1.id,
                    },
                ],
            },
        },
        {
            id: '08599e44-218c-4433-9974-4c11e377d84b',
            description: 'Сборник моих любимых аниме_2',
            user_profile_id: profile4.id,
            user_collection_id: profile4.id,
            user_favourite_collections_id: profile4.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме_2',
            type: 'DEFAULT',
            is_public: true,
            thumbnail_id: file2.id,
            is_collection: true,
            animes: {
                connect: [
                    {
                        id: anime3.id,
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
            id: 'edb1f80c-a9b4-4551-b6ca-0355a02b8089',
            description: 'Сборник моих любимых аниме_3',
            user_profile_id: profile5.id,
            user_collection_id: profile5.id,
            user_favourite_collections_id: profile5.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме_3',
            thumbnail_id: file1.id,
            type: 'DEFAULT',
            is_public: true,
            is_collection: true,
            animes: {
                connect: [
                    {
                        id: anime3.id,
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
            id: 'e10087d0-26cb-4b5d-bd9a-143e65f07a72',
            description: 'Сборник моих любимых аниме_4',
            user_profile_id: profile3.id,
            user_collection_id: profile3.id,
            user_favourite_collections_id: profile3.id,
            hashtags: ['ANIME'],
            name: 'Любимые аниме_4',
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
                        id: anime3.id,
                    },
                    {
                        id: anime4.id,
                    },
                ],
            },
        },
    ];
};
