import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum AnimeStillsSortField {
    PRIORITY = 'priority',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}

registerEnumType(AnimeStillsSortField, {
    name: 'AnimeStillsSortField',
});
