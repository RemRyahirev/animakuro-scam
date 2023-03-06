import { ArgsType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional, IsString } from '@nestjs/class-validator';

import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { GetAiringScheduleSortField } from '../enums/get-airing-schedule-sort-field.enum';
import { AiringScheduleRelevance } from '../enums/airing-schedule-relevance.enum';

@ArgsType()
export class GetListAiringScheduleInputType {
    /**
     * Field for sorting
     */
    @IsOptional()
    @IsString()
    sort_field?: GetAiringScheduleSortField;

    /**
     * Sort order
     */
    @IsOptional()
    @IsString()
    sort_order?: SortOrder;

    @IsOptional()
    @IsEnum(AiringScheduleRelevance)
    @Field({ defaultValue: AiringScheduleRelevance.ALL })
    relevance?: AiringScheduleRelevance;

    /**
     * ISO 8601. Start airing_at date
     */
    @IsOptional()
    @IsDate()
    start_airing_at?: Date;

    /**
     * ISO 8601. End airing_at date
     */
    @IsOptional()
    @IsDate()
    end_airing_at?: Date;
}
