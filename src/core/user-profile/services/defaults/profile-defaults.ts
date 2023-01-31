import { notificationsDefault } from '../../../profile-settings/models/inputs/defaults/notifications.default';

export const profileDefaults = {
    profile_settings: {
        create: {
            integrations: [],
            notifications: notificationsDefault,
        },
    },
    profile_folders: {
        create: [
            {
                name: 'Смотрю',
                description: 'Аниме, которые я смотрю',
            },
            {
                name: 'Запланированно',
                description: 'Запланированные аниме',
            },
            {
                name: 'Просмотрено',
                description: 'Просмотренные аниме',
            },
            {
                name: 'Брошено',
                description: 'Аниме, брошенные мною',
            },
        ],
    },
};
