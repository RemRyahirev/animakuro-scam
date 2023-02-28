import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "@app/common/models/results";
import { AnimeHistory } from "../../../anime/models/history.model";
import { AuthorHistory } from "../../../author/models/history.model";


@ObjectType()
export class AddHistoryAuthorResultsType extends BaseResultsType {
    @Field(() => AuthorHistory, {
        nullable: true,
        description: 'Created history'
    })
    author_history?: AuthorHistory | null;
}