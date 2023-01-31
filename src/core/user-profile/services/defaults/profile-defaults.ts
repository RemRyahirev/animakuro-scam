import { notificationsDefault } from '../../../profile-settings/models/inputs/defaults/notifications.default';

export const profileDefaults = {
    profile_settings: {
        create: {
            integrations: [],
            notifications: notificationsDefault,
        },
    },
};
