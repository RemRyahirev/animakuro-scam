import { registerEnumType } from '@nestjs/graphql';
import {YearSeason} from '@prisma/client'
export {YearSeason} from '@prisma/client'
import 'reflect-metadata';

// export enum YearSeason {
//     FALL = 'FALL',
//     SUMMER = 'SUMMER',
//     SPRING = 'SPRING',
//     WINTER = 'WINTER',
// }

registerEnumType(YearSeason, {
    name: 'YearSeason',
});
