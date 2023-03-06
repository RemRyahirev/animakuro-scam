import { IsOptional, IsString } from '@nestjs/class-validator';
import { ArgsType } from '@nestjs/graphql';

import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { OpeningEndingSortField } from '../enums/opening-ending.enum';

@ArgsType()
export class GetOpeningEndingListSortArgsType {
    /**
     * Field for sorting
     */
    @IsOptional()
    @IsString()
    sort_field?: OpeningEndingSortField;

    /**
     * Sort order
     */
    @IsOptional()
    @IsString()
    sort_order?: SortOrder;
}
