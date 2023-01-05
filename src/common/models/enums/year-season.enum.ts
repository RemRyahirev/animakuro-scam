import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum YearSeason {
    FALL = 'FALL',
    SUMMER = 'SUMMER',
    SPRING = 'SPRING',
    WINTER = 'WINTER',
}

registerEnumType(YearSeason, {
    name: 'YearSeason',
});
