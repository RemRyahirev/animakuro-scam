import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum CharacterType {
    PROTAGONIST = 'PROTAGONIST',
    ANTAGONIST = 'ANTAGONIST',
    SIDEKICK = 'SIDEKICK',
    ORBITAL_CHARACTER = 'ORBITAL_CHARACTER',
    LOVE_INTEREST = 'LOVE_INTEREST',
    CONFIDANTE = 'CONFIDANTE',
    EXTRAS = 'EXTRAS',
    FOIL = 'FOIL',
    OTHER = 'OTHER',
}

registerEnumType(CharacterType, {
    name: 'CharacterType',
});
