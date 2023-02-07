import { registerEnumType } from "@nestjs/graphql";
import 'reflect-metadata';
// import { OpeningEndingType } from '@prisma/client';

export enum OpeningEndingType {
    OPENING = 'OPENING',
    ENDING = 'ENDING'
}

registerEnumType(OpeningEndingType, {
    name: 'OpeningEndingType',
});