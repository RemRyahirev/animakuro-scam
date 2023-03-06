import { IsOptional, IsString, Length } from 'class-validator';
import { ArgsType } from '@nestjs/graphql';

import { SortOrder } from '@app/common/models/enums/sort-order.enum';

@ArgsType()
export class CatalogBasicArgsType {
    /**
     * Search string
     */
    @IsOptional()
    @IsString()
    @Length(0, 100)
    search?: string;

    /**
     * Sort order
     */
    @IsOptional()
    @IsString()
    sort_order?: SortOrder
}
