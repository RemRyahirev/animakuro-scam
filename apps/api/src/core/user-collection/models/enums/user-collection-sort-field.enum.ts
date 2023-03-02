import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum UserCollectionCollectionSortField {
    CREATED_AT = 'created_at',
    NAME = 'name',
}

registerEnumType(UserCollectionCollectionSortField, {
    name: 'UserCollectionCollectionSortField',
});
