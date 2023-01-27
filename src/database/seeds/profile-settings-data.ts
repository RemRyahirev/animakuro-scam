import { ModeratorRoles, ProfileIntegrations } from '../../common/models/enums';
import {
    Gender,
    PrismaClient,
    ProfileCountries,
    ProfileType,
    SiteTheme,
    SubscribeTier,
} from '@prisma/client';

const prisma = new PrismaClient();

export const profileSettingsData = async () => {
    const profileList = await prisma.userProfile.findMany();

    if (!profileList.length) {
        throw new Error('Profile table is empty or not available');
    }

    return [
        {
            id: '13b87a7a-010b-4390-95de-8d09be3d40b0',
            profile_id: '40e27c3a-9368-4214-af26-9b15556e891d',
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
            notifications: {
                new_episode: true,
                sound: true,
            },
            subscribe_tier: SubscribeTier.PLATINUM,
        },
        {
            id: '4a0fb5ef-53bd-46ba-9fa7-c1620291f27a',
            profile_id: '4c077aa5-4a4d-49fa-b66c-31836416a0ae',
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
            notifications: {
                new_episode: false,
                sound: true,
            },
        },
        {
            id: '62f8a268-16b6-4c51-8291-cc61f90fc9e9',
            profile_id: 'de076ab4-e5a3-4913-9040-6fd157922282',
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
            notifications: {
                new_episode: true,
                sound: false,
            },
        },
    ];
};
