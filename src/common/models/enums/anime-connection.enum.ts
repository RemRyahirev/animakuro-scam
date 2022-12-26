import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum AnimeConnection {
    DIRECT = 'DIRECT',
    CHRONOLOGY = 'CHRONOLOGY',
    FRANCHISE = 'FRANCHISE',
}

registerEnumType(AnimeConnection, {
    name: 'AnimeConnection',
});
