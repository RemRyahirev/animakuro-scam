import {
    Gender,
    ModeratorRoles,
    PrismaClient,
    ProfileCountries,
    ProfileType,
    SiteTheme,
    UserProfile,
} from '@prisma/client';

import { ProfileIntegrations } from '../../libs/common/src/models/enums';

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
            displayed_name: 'Alexanrus',
            gender: Gender.MALE,
            birthday: new Date('2000-11-10'),
            site_theme: SiteTheme.DARK,
            country: ProfileCountries.RUSSIA,
            timezone: 'UTC-3',
            profile_type: ProfileType.PRIVATE,
            is_blocked: false,
            moderator_role: ModeratorRoles.VIEWER,
            about: 'Я Александр',
            integrations: [
                {
                    name: ProfileIntegrations.DISCORD,
                    url: 'https://discord.com/34agrdtaaewt',
                },
                {
                    name: ProfileIntegrations.VK,
                    url: 'https://vk.com/undefinedProfile',
                },
            ],
        },
        {
            id: '4c077aa5-4a4d-49fa-b66c-31836416a0ae',
            user_id: '5b594675-a3c6-4e1b-acaa-2e612419b9e2',
            displayed_name: 'Anatoly1234',
            gender: Gender.MALE,
            birthday: new Date('1997-05-30'),
            site_theme: SiteTheme.LIGHT,
            country: ProfileCountries.JAPAN,
            timezone: 'UTC+2',
            is_blocked: false,
            moderator_role: ModeratorRoles.ADMIN,
            about: 'Я Анатолий',
            profile_type: ProfileType.PUBLIC,
            integrations: [
                {
                    name: ProfileIntegrations.SKYPE,
                    url: 'https://skype.net/53a5awe5aew',
                },
            ],
        },
        {
            id: 'de076ab4-e5a3-4913-9040-6fd157922282',
            user_id: '71d46841-94f0-4310-88c3-662b7fd817ec',
            displayed_name: 'Evgen353',
            gender: Gender.UNSPECIFIED,
            birthday: new Date('1579-01-22'),
            site_theme: SiteTheme.AUTO,
            country: ProfileCountries.UKRAINE,
            timezone: 'UTC+14',
            is_blocked: true,
            moderator_role: ModeratorRoles.MODERATOR,
            about: 'Я Евгений',
            profile_type: ProfileType.PUBLIC,
            integrations: [
                {
                    name: ProfileIntegrations.STEAM,
                    url: 'https://steam.community.com/myId',
                },
                {
                    name: ProfileIntegrations.TELEGRAM,
                    url: 'https://telegram.web.com/eatsdta35',
                },
            ],
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
    ] satisfies Array<Partial<UserProfile>>;
};
