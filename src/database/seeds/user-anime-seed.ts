import { PrismaClient } from "@prisma/client";
import { WatchStatus } from "../../common/models/enums";

//const prisma = new PrismaClient();

export async function userAnimeSeed(prisma: PrismaClient){
    console.log('Starting userAnime table seeding...');
    const userProfileList = await prisma.userProfile.findMany();
    const animeList = await prisma.anime.findMany();

    if(!userProfileList.length || !animeList.length){
        throw new Error ('Either UserProfile or Anime table is empty or not available');
    }

    const [anime1, anime2] = animeList;
    const [profile1, profile2] = userProfileList;

    const userAnimeData = [
        {

            user_profile_id: profile1.id,
            anime_id: anime1.id,
            // информативный блок
            status:WatchStatus.DROPPED,
            in_favourites:true,
        },
        {
            user_profile_id: profile2.id,
            anime_id: anime2.id,
            // информативный блок
            in_favourites:true,
            // блок для аниме со статусом WATCHING
            season:3,
            episode:2,
            episode_duration:1200,
            watched_duration:400,
        }
    ]

    await prisma.userAnime.createMany({
        data: userAnimeData
    })

    console.log(`Seeding userAnime finished.`)
}

// перенёс промис в index.ts
// userAnimeSeed()
//     .catch(e => console.error(e))
//     .finally(async() => await prisma.$disconnect())
