import { registerEnumType } from 'type-graphql';

export enum Gender {
    UNSPECIFIED = 'UNSPECIFIED',
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    CUSTOM = 'CUSTOM',
}

registerEnumType(Gender, {
    name: 'Gender',
});
