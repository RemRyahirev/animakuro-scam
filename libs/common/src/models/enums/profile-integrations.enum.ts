import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum ProfileIntegrations {
    DISCORD = 'DISCORD',
    STEAM = 'STEAM',
    VK = 'VK',
    TELEGRAM = 'TELEGRAM',
    SLACK = 'SLACK',
    SKYPE = 'SKYPE',
    FACEBOOK = 'FACEBOOK',
    TWITTER = 'TWITTER',
    ORIGIN_EA = 'ORIGIN_EA',
    BATTLE_NET = 'BATTLE_NET',
}

registerEnumType(ProfileIntegrations, {
    name: 'ProfileIntegrations',
});
