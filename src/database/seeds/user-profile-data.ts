import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userProfileData = async () => {
    const userList = await prisma.user.findMany();

    if (!userList.length) {
        throw new Error('Users table is empty or not available');
    }

    return [
        {
            id: '40e27c3a-9368-4214-af26-9b15556e891d',
            user_id: '90530696-1da8-4156-9b77-538d344d53ca',
        },
        {
            id: '4c077aa5-4a4d-49fa-b66c-31836416a0ae',
            user_id: '5b594675-a3c6-4e1b-acaa-2e612419b9e2',
        },
        {
            id: 'de076ab4-e5a3-4913-9040-6fd157922282',
            user_id: '71d46841-94f0-4310-88c3-662b7fd817ec',
        },
        {
            id: '6c41d24f-dae8-4531-8936-bc40afc7e3a5',
            user_id: '03c6c54d-8597-43b8-a793-4fb36522cc61',
        },
        {
            id: 'ed715078-5815-4993-874c-65944a425028',
            user_id: '4c323fe8-d35a-4e84-9f75-92f20fcec028',
        },
        {
            id: '0ab2bac4-b633-4fd5-ab09-896589d306d1',
            user_id: '2b2133d4-6973-4c15-88a6-8b8c19c96fab',
        },
    ];
};
