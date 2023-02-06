import { PaginationResultsType } from "../../../../common/models/results/pagination-results.type";
import { Field, ObjectType } from "@nestjs/graphql";
import { Opening } from "../opening.model";
import { BaseResultsType } from "../../../../common/models/results/index";


@ObjectType()
export class GetOpeningListResultsType extends BaseResultsType {
    @Field(() => [Opening], {
        description: 'Opening list'
    })
    opening_list: Opening[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}