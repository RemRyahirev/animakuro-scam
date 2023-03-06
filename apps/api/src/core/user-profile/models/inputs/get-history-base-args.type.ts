import { IsOptional, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, Int } from "@nestjs/graphql";
import { SortOrder } from "@app/common/models/enums/sort-order.enum";
import { HistorySortFields } from "../base-history.model";

@ArgsType()
export class GetHistoryBaseArgsType {
    @IsUUID()
    @Field(() => ID, {
        description: 'Story owner id'
    })
    user_id: string;

    @IsOptional()
    @Field(() => Int, {
        nullable: true,
        description: 'Time in seconds no less than'
    })
    min_spent_time?: number;

    @IsOptional()
    @Field(() => Int, {
        nullable: true,
        description: 'Time in seconds no more than'
    })
    max_spent_time?: number;

    @IsOptional()
    @Field(() => SortOrder, {
        defaultValue: SortOrder.DESC,
        description: 'Order by ASC/DESC'
    })
    sort_order: SortOrder;

    @IsOptional()
    @Field(() => HistorySortFields, {
        defaultValue: HistorySortFields.UPDATED_AT,
        description: 'Sort by field'
    })
    sort_field: HistorySortFields;
}
