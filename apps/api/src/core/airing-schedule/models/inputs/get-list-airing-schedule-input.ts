import { ArgsType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional, IsString } from '@nestjs/class-validator';

import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { GetAiringScheduleSortField } from '../enums/get-airing-schedule-sort-field.enum';
import { AiringScheduleRelevance } from '../enums/airing-schedule-relevance.enum';

@ArgsType()
export class GetListAiringScheduleInput {
    @IsOptional()
    @IsString()
    @Field(() => GetAiringScheduleSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: GetAiringScheduleSortField;

    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true, description: 'Sort order' })
    sort_order?: SortOrder;

    @IsOptional()
    @IsEnum(AiringScheduleRelevance)
    @Field(() => AiringScheduleRelevance, {
        nullable: true,
        defaultValue: AiringScheduleRelevance.ALL,
    })
    relevance?: AiringScheduleRelevance;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. Start airing_at date',
    })
    start_airing_at?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. End airing_at date',
    })
    end_airing_at?: Date;
}
