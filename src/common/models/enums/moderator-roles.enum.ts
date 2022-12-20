import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

// ! Второй экземпляр находится в схеме Призмы! Меняем тут - не забываем и там!
export enum ModeratorRoles {
    ADMIN = 'ADMIN', // Animakuro администратор
    MODERATOR = 'MODERATOR', // модератор
    CONTENT_FILLER = 'CONTENT_FILLER', // сотрудник, наполняющий сайт контентом (аниме и пр)
    OTHER_STAFF = 'OTHER_STAFF', // прочий персонал
    VIEWER = 'VIEWER', // обычный пользователь сайта без каких-то прав
}

registerEnumType(ModeratorRoles, {
    name: 'ModeratorRoles',
});

