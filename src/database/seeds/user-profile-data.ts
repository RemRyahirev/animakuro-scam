import { PrismaClient } from '@prisma/client';
import { ModeratorRoles, SubscribeTier } from '../../common/models/enums';

const prisma = new PrismaClient();

export const userProfileData = async () => {
    const userList = await prisma.user.findMany();

    if (!userList.length) {
        throw new Error('Users table is empty or not available');
    }

    const [user1, user2, user3] = userList;

    return [
        {
            id: '40e27c3a-9368-4214-af26-9b15556e891d',
            user_id: user1.id,
            displayed_name: `имя: ${user1.username}`,
            profile_picture_id: 'c38e5c23-38cc-4da0-b99e-628d11bb81f4',
            banner_image: 'c38e5c23-38cc-4da0-b99e-628d11bb81f4',
            about: `Профиль создан ${user1.createdAt}`,
            country: 'RUSSIA',
            language: 'ru-ru',
            subscribe_tier: SubscribeTier.BASIC,
            moderator_role: ModeratorRoles.MODERATOR,
        },
        {
            id: '4c077aa5-4a4d-49fa-b66c-31836416a0ae',
            user_id: user2.id,
            displayed_name: `имя: ${user2.username}`,
            profile_picture_id: '65810f0e-b8b0-4f2a-aef2-4169acec54c6',
            banner_image: '65810f0e-b8b0-4f2a-aef2-4169acec54c6',
            about: `Профиль создан ${user2.createdAt}`,
            country: 'UKRAINE',
            language:'uk-uk',
            subscribe_tier: SubscribeTier.FREE_ACCOUNT,
            moderator_role: ModeratorRoles.VIEWER,
        },
        {
            id: 'de076ab4-e5a3-4913-9040-6fd157922282',
            user_id: user3.id,
            displayed_name: `имя: ${user3.username}`,
            profile_picture_id: '3466c111-083f-4b17-964c-bc3d5a1f4953',
            banner_image: '3466c111-083f-4b17-964c-bc3d5a1f4953',
            about: `Профиль создан ${user3.createdAt}`,
            country: 'MOLDOVA',
            language: 'mo-mo',
            subscribe_tier: SubscribeTier.BASIC,
            moderator_role: ModeratorRoles.CONTENT_FILLER,
        },
    ];
};
