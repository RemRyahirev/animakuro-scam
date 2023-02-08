import { registerEnumType } from "@nestjs/graphql";
import 'reflect-metadata';

export enum OpeningEndingType {
    OPENING = 'OPENING',
    ENDING = 'ENDING'
}

export enum OpeningEndingSortField {
    NAME = 'name',
    AUTHOR_NAME = 'author_name',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}

registerEnumType(OpeningEndingSortField, {
    name: 'OpeningEndingSortField',
});

registerEnumType(OpeningEndingType, {
    name: 'OpeningEndingType',
});