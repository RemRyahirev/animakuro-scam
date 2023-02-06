import { PaginationResultsType } from "../../../../common/models/results/pagination-results.type";
import { Field, ObjectType } from "@nestjs/graphql";
import { Ending } from "../ending.model";
import { BaseResultsType } from "../../../../common/models/results/index";



@ObjectType()
export class GetEndingListResultsType extends BaseResultsType {
    @Field(() => [Ending], {
        description: 'Ending list'
    })
    opening_list: Ending[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}