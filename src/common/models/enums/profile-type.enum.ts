import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum ProfileType {
    PUBLIC = 'PUBLIC',
    //FOR_FRIENDS = 'FOR_FRIENDS', не реализуемо!
    PRIVATE = 'PRIVATE',
}

registerEnumType(ProfileType, {
    name: 'ProfileType',
});
