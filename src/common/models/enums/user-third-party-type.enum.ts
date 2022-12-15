import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum ThirdPartyAuthType {
    DISCORD = 'DISCORD',
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE',
    FACEBOOK = 'FACEBOOK',
}

registerEnumType(ThirdPartyAuthType, {
    name: 'ThirdPartyAuthType',
});
