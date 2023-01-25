import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum GetAiringScheduleSortField {
    AIRING_AT = 'airing_at',
    UPDATED_AT = 'updated_at',
    CREATED_AT = 'created_at',
}

registerEnumType(GetAiringScheduleSortField, {
    name: 'GetAiringScheduleSortField',
});
