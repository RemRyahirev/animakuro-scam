import { notificationsDefault } from '../../../profile-settings/models/inputs/defaults/notifications.default';
import { Media } from '@prisma/client';

export const profileDefaults = {
    profile_settings: {
        create: {
            integrations: [],
            notifications: notificationsDefault,
        },
    },
    profile_favourites: {
        create: [
            {
                media_type: Media.ANIMES,
            },
            {
                media_type: Media.AUTHORS,
            },
            {
                media_type: Media.CHARACTERS,
            },
            {
                media_type: Media.GENRES,
            },
            {
                media_type: Media.STUDIOS,
            },
        ],
    },
};
