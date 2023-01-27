import { PrismaClient } from '@prisma/client';

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
        },
        {
            id: '4c077aa5-4a4d-49fa-b66c-31836416a0ae',
            user_id: user2.id,
        },
        {
            id: 'de076ab4-e5a3-4913-9040-6fd157922282',
            user_id: user3.id,
        },
    ];
};
