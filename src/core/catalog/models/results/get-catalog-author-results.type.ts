import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType, PaginationResultsType } from "../../../../common/models/results";
import { Author } from "../../../author/models/author.model";

@ObjectType()
export class GetCatalogAuthorResultsType extends BaseResultsType {
    @Field(() => [Author], {
        nullable: true,
        description: 'Catalog Author list',
    })
    author_list: Author[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
