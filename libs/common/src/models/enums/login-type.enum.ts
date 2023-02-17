import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum LoginType {
    AUTH,
    TWO_FA,
}

registerEnumType(LoginType, {
    name: 'LoginType',
});
