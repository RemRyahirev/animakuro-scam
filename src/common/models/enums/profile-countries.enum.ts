import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum ProfileCountries {
    USA = 'USA',
    RUSSIA = 'RUSSIA',
    JAPAN = 'JAPAN',
    UKRAINE = 'UKRAINE',
    UNSPECIFIED = 'UNSPECIFIED'
}

registerEnumType(ProfileCountries, {
    name: 'ProfileCountries',
});
