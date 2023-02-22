import { ArgsType, Field, ID } from "@nestjs/graphql";
import { SortOrder } from "common/models/enums/sort-order.enum";
import { AnimeStillsSortField } from "../stills.model";



@ArgsType()
export class GetStillsByAnimeIdInputType {
    @Field(() => ID, {
        description: 'Parent anime\'s id'
    })
    anime_id: string;

    @Field(() => AnimeStillsSortField, {
        nullable: true,
        description: 'Sort by field',
        defaultValue: AnimeStillsSortField.PRIORITY
    })
    sort_field: AnimeStillsSortField

    @Field(() => SortOrder, {
        nullable: true,
        description: 'Sort order',
        defaultValue: SortOrder.ASC
    })
    sort_order: SortOrder;
}