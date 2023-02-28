import { BaseResultsType } from "@app/common/models/results";
import { Field, ObjectType } from "@nestjs/graphql";
import { AuthorHistory } from "../../../author/models/history.model";



@ObjectType()
export class GetHistoryAuthorResultsType extends BaseResultsType {
    @Field(() => [AuthorHistory], {
        nullable: true,
        description: 'Author history list'
    })
    author_history_list?: AuthorHistory[];
}