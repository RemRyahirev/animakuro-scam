import { PrismaClient } from "@prisma/client";
import { SubscribeTier, ModeratorRoles } from "../../common/models/enums";

//const prisma = new PrismaClient();

export async function userProfileSeed(prisma: PrismaClient){
    console.log('Starting userProfile table seeding...');
    const userList = await prisma.user.findMany();

    if(!userList.length){
        throw new Error ('Users table is empty or not available');
    }

    const [user1, user2, user3] = userList;

    const userProfileData = [
        {
            user_id: user1.id,
            displayed_name:`имя: ${user1.username }`,
            profile_picture_id:'c38e5c23-38cc-4da0-b99e-628d11bb81f4',
            banner_image:'c38e5c23-38cc-4da0-b99e-628d11bb81f4',
            about:`Профиль создан ${user1.createdAt}`,
            country:'RUSSIA',
            language:'ru-ru',
            subscribe_tier:SubscribeTier.BASIC,
            moderator_role:ModeratorRoles.MODERATOR,
        },
        {
            user_id: user2.id,
            displayed_name:`имя: ${user2.username }`,
            profile_picture_id:'c38e5c23-38cc-4da0-b99e-628d11bb81f4',
            banner_image:'c38e5c23-38cc-4da0-b99e-628d11bb81f4',
            about:`Профиль создан ${user2.createdAt}`,
            country:'UKRAINE',
            language:'uk-uk',
            subscribe_tier:SubscribeTier.FREE_ACCOUNT,
            moderator_role:ModeratorRoles.VIEWER,
        }
    ]

    await prisma.userProfile.createMany({
        data: userProfileData
    })

    console.log(`Seeding userProfile finished.`)
}

// перенёс промис в index.ts
// userProfileSeed()
//     .catch(e => console.error(e))
//     .finally(async() => await prisma.$disconnect())
