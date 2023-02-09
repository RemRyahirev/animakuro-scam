import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum AuthType {
    JWT = 'jwt',
    GOOGLE = 'google',
    APPLE = 'apple',
    DISCORD = 'discord',
    FACEBOOK = 'facebook',
    SHIKIMORI = 'shikimori',
}

registerEnumType(AuthType, {
    name: 'AuthType',
});
