import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseHistoryModel } from "../../user-profile/models/base-history.model";
import { Author } from "./author.model";



@ObjectType()
export class AuthorHistory extends BaseHistoryModel {
    @Field(() => ID)
    author_id: string;

    @Field(() => Author)
    author: Author;
}