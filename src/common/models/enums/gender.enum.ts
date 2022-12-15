import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum Gender {
    UNSPECIFIED = 'UNSPECIFIED',
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    CUSTOM = 'CUSTOM',
}

registerEnumType(Gender, {
    name: 'Gender',
});
