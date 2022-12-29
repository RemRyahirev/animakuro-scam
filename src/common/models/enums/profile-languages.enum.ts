import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum ProfileLanguages {
    ENGLISH = 'ENGLISH',
    RUSSIAN = 'RUSSIAN',
    JAPANESE = 'JAPANESE',
    UKRAINIAN = 'UKRAINIAN'
}

registerEnumType(ProfileLanguages, {
    name: 'ProfileLanguages',
});
