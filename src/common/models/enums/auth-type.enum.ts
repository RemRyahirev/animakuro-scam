import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum AuthType {
    LOCAL = 'local',
    JWT = 'jwt',
    GOOGLE = 'google',
    APPLE = 'apple',
    DISCORD = 'discord',
    FACEBOOK = 'facebook',
}

registerEnumType(AuthType, {
    name: 'AuthType',
});
