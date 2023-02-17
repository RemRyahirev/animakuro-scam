import { registerEnumType } from '@nestjs/graphql';
import { OpeningEndingType } from '@prisma/client';
export { OpeningEndingType } from '@prisma/client';
import 'reflect-metadata';

export enum OpeningEndingSortField {
    NAME = 'name',
    AUTHOR_NAME = 'author_name',
    EPISODE_START = 'episode_start',
    EPISODE_END = 'episode_end',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}

registerEnumType(OpeningEndingSortField, {
    name: 'OpeningEndingSortField',
});

registerEnumType(OpeningEndingType, {
    name: 'OpeningEndingType',
});
