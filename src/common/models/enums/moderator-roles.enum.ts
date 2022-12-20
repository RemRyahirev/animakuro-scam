import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum ModeratorRoles {
    ADMIN = 'ADMIN', // Animakuro administrator
    MODERATOR = 'MODERATOR', // модератор
    CONTENT_FILLER = 'CONTENT_FILLER', // сотрудник, наполняющий сайт контентом (аниме и пр)
    OTHER_STAFF = 'OTHER_STAFF', // прочий персонал
    VIEWER = 'VIEWER', // обычный пользователь сайта без каких-то прав
}

registerEnumType(ModeratorRoles, {
    name: 'ModeratorRoles',
});

