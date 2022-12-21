import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum CharacterRole {
    MAIN = 'MAIN',
    SUPPORTING = 'SUPPORTING',
    BACKGROUND = 'BACKGROUND',
}

registerEnumType(CharacterRole, {
    name: 'CharacterRole',
});
