import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum AnimeRelation {
    DIRECT = 'DIRECT',
    CHRONOLOGY = 'CHRONOLOGY',
    FRANCHISE = 'FRANCHISE',
}

registerEnumType(AnimeRelation, {
    name: 'AnimeConnection',
});
