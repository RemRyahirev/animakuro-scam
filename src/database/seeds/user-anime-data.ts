import { PrismaClient } from '@prisma/client';
import { WatchStatus } from '../../common/models/enums';

const prisma = new PrismaClient();

export const userAnimeData = async () => {
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
            user_profile_id: profile1.id,
            anime_id: anime1.id,
            // информативный блок
            status: WatchStatus.DROPPED,
           in_favourites: true,
        },
        {
            id: 'c892638f-bc77-4ae8-ac7f-2ffcfb9a2f32',
            user_profile_id: profile2.id,
            anime_id: anime2.id,
            // информативный блок
            in_favourites: true,
            // блок для аниме со статусом WATCHING
            season: 3,
            episode: 2,
            episode_duration: 1200,
            watched_duration: 400,
        },
    ];
};
