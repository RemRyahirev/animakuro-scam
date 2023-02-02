import { notificationsDefault } from '../../core/profile-settings/models/inputs/defaults/notifications.default';

export const userDefaults = {
    user_folders: {
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
    user_profile: {
        create: {
            profile_settings: {
                create: {
                    integrations: [],
                    notifications: notificationsDefault,
                },
            },
        },
    },
};
