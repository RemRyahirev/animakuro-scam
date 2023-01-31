import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const profileFoldersData = async () => {
    const userProfileList = await prisma.userProfile.findMany();
    const animeList = await prisma.anime.findMany();

    if (!userProfileList.length || !animeList.length) {
        throw new Error(
            'Either UserProfile or Anime table is empty or not available',
        );
    }

    const [anime1, anime2] = animeList;
    const [profile1, profile2] = userProfileList;

    return [
        {
            id: '809d1892-92fc-421d-9889-10e4be311057',
            profile_id: profile1.id,
            animes: {
                connect: { id: anime1.id },
            },
            name: 'Запланировано',
            description: 'Запланировал я эти аниме!',
            // информативный блок
        },
        {
            id: 'c892638f-bc77-4ae8-ac7f-2ffcfb9a2f32',
            profile_id: profile2.id,
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
