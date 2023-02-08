import { SortOrder } from "../../../../common/models/enums/sort-order.enum";
import { IsOptional, IsString } from "@nestjs/class-validator";
import { ArgsType, Field } from "@nestjs/graphql";
import { OpeningEndingSortField } from "../enums/opening-ending.enum";


@ArgsType()
export class GetOpeningEndingListSortInputType {
    @IsOptional()
    @IsString()
    @Field(() => OpeningEndingSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: OpeningEndingSortField;

    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true, description: 'Sort order' })
    sort_order?: SortOrder;
}