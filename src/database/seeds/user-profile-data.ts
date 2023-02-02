import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userProfileData = async () => {
    const userList = await prisma.user.findMany();

    if (!userList.length) {
        throw new Error('Users table is empty or not available');
    }

    const [user1, user2, user3, user4, user5, user6] = userList;

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
        {
            id: '6c41d24f-dae8-4531-8936-bc40afc7e3a5',
            user_id: user4.id,
        },
        {
            id: 'ed715078-5815-4993-874c-65944a425028',
            user_id: user5.id,
        },
        {
            id: '0ab2bac4-b633-4fd5-ab09-896589d306d1',
            user_id: user6.id,
        },
    ];
};
