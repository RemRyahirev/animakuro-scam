import { PaginationResultsType } from "../../../../common/models/results/pagination-results.type";
import { Field, ObjectType } from "@nestjs/graphql";
import { OpeningEnding } from "../opening-ending.model";
import { BaseResultsType } from "../../../../common/models/results/index";


@ObjectType()
export class GetOpeningEndingListResultsType extends BaseResultsType {
    @Field(() => [OpeningEnding], {
        description: 'Opening/ending list'
    })
    opening_list: OpeningEnding[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}