import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum FolderType {
    WATCHING = 'WATCHING',
    PLAN_TO_WATCH = 'PLAN_TO_WATCH',
    COMPLETED = 'COMPLETED',
    REWATCHING = 'REWATCHING',
    PAUSED = 'PAUSED',
    DROPPED = 'DROPPED',
    DEFAULT = 'DEFAULT', // Стандарный Фолдер
}

registerEnumType(FolderType, {
    name: 'FolderType',
});
