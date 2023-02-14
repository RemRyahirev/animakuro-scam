import { notificationsDefault } from '../../core/profile-settings/models/inputs/defaults/notifications.default';
import { FolderType } from '../models/enums/folder-type.enum';

export const userDefaults = {
    user_folders: {
        create: [
            {
                name: 'Смотрю',
                description: 'Аниме, которые я смотрю',
                type: FolderType.LOOKING,
            },
            {
                name: 'Запланированно',
                description: 'Запланированные аниме',
                type: FolderType.PLANNED,
            },
            {
                name: 'Просмотрено',
                description: 'Просмотренные аниме',
                type: FolderType.VIEWED,
            },
            {
                name: 'Брошено',
                description: 'Аниме, брошенные мною',
                type: FolderType.ABANDONED,
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
