import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum ThirdPartyAuth {
    DISCORD = 'DISCORD',
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE',
    FACEBOOK = 'FACEBOOK',
}

registerEnumType(ThirdPartyAuth, {
    name: 'ThirdPartyAuth',
});
