import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum FolderType {
    WATCHING = 'WATCHING', //Смотрю
    PLAN_TO_WATCH = 'PLAN_TO_WATCH', // Брошено
    COMPLETED = 'COMPLETED', // Запланированно
    REWATCHING = 'REWATCHING', // Просмотрено
    PAUSED = 'PAUSED', // Просмотрено
    DROPPED = 'DROPPED', // Просмотрено
    DEFAULT = 'DEFAULT', // Стандарный Фолдер
}

registerEnumType(FolderType, {
    name: 'FolderType',
});
