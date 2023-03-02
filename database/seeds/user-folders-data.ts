import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userFoldersData = async () => {
    const profileList = await prisma.userProfile.findMany();
    const animeList = await prisma.anime.findMany();

    if (!profileList.length || !animeList.length) {
        throw new Error('Either User or Anime table is empty or not available');
    }

    const [anime1, anime2] = animeList;
    const [profile1, profile2] = profileList;

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
            id: 'c892638f-bc77-4ae8-ac7f-2ffcfb9a2f32',
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
    ];
};
