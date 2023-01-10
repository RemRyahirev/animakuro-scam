import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum AnimeRelation {
    DIRECT = 'DIRECT',
    CHRONOLOGY = 'CHRONOLOGY',
    FRANCHISE = 'FRANCHISE',
    NULL = 'NULL',
}

registerEnumType(AnimeRelation, {
    name: 'AnimeRelation',
});
