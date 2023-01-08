import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum SubscribeTier {
    FREE_ACCOUNT = 'FREE_ACCOUNT',
    BASIC = 'BASIC',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM',
}

registerEnumType(SubscribeTier, {
    name: 'SubscribeTier',
});
