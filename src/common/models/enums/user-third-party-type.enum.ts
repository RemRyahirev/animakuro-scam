import { registerEnumType } from 'type-graphql';

export enum ThirdPartyAuthType {
    DISCORD = 'DISCORD',
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE',
    FACEBOOK = 'FACEBOOK',
}

registerEnumType(ThirdPartyAuthType, {
    name: 'ThirdPartyAuthType',
});
