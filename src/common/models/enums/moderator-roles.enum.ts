import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum ModeratorRoles {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    CONTENT_FILLER = 'CONTENT_FILLER',
    OTHER_STAFF = 'OTHER_STAFF',
    VIEWER = 'VIEWER',
}

registerEnumType(ModeratorRoles, {
    name: 'ModeratorRoles',
});

