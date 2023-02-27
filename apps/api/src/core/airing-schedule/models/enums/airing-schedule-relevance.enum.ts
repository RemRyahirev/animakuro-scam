import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum AiringScheduleRelevance {
    ALL = 'all',
    RELEASED = 'released',
    PLANNED = 'planned',
}

registerEnumType(AiringScheduleRelevance, {
    name: 'AiringScheduleRelevance',
});
