import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum FolderType {
    LOOKING = 'LOOKING', //Смотрю
    ABANDONED = 'ABANDONED', // Брошено
    PLANNED = 'PLANNED', // Запланированно
    VIEWED = 'VIEWED', // Просмотрено
    DEFAULT = 'DEFAULT', // Стандарный Фолдер
}

registerEnumType(FolderType, {
    name: 'FolderType',
});
