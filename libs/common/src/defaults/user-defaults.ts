import { notificationsDefault } from '../../../../apps/api/src/core/user/models/inputs/defaults/notifications.default';

import { FolderType } from '../models/enums/folder-type.enum';

export const userDefaults = {
    notifications: notificationsDefault,
    user_profile: {
        create: {
            integrations: [],
            user_folders: {
                create: [
                    {
                        name: 'Смотрю',
                        description: 'Аниме, которые я смотрю',
                        type: FolderType.WATCHING,
                    },
                    {
                        name: 'Запланированно',
                        description: 'Запланированные аниме',
                        type: FolderType.PLAN_TO_WATCH,
                    },
                    {
                        name: 'Просмотрено',
                        description: 'Просмотренные аниме',
                        type: FolderType.COMPLETED,
                    },
                    {
                        name: 'Брошено',
                        description: 'Аниме, брошенные мною',
                        type: FolderType.DROPPED,
                    },
                ],
            },
        },
    },
};
