import { registerEnumType } from '@nestjs/graphql';
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
