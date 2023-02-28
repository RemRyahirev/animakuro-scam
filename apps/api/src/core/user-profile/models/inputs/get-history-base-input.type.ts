import { IsOptional, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, Int } from "@nestjs/graphql";
import { SortOrder } from "@app/common/models/enums/sort-order.enum";
import { HistorySortFields } from "../base-history.model";



@ArgsType()
export class GetHistoryBaseInputType {
    @IsUUID()
    @Field(() => ID)
    user_id: string;

    @IsOptional()
    @Field(() => Int, {
        nullable: true
    })
    min_spent_time?: number;

    @IsOptional()
    @Field(() => Int, {
        nullable: true
    })
    max_spent_time?: number;

    @IsOptional()
    @Field(() => SortOrder, {
        defaultValue: SortOrder.DESC
    })
    sort_order: SortOrder;

    @IsOptional()
    @Field(() => HistorySortFields, {
        defaultValue: HistorySortFields.UPDATED_AT
    })
    sort_field: HistorySortFields;
}