import { registerEnumType } from 'type-graphql';

export enum LoginType {
    AUTH,
    TWO_FA,
}

registerEnumType(LoginType, {
    name: 'LoginType',
});
