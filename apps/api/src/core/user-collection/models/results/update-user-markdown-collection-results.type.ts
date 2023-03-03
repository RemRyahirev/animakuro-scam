import { BaseResultsType } from "@app/common/models/results";
import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class UpdateMarkdownCollectionResultsType extends BaseResultsType {
    @Field(() => String, {
        description: 'Raw markdown'
    })
    markdown?: string;

    @Field(() => String, {
        description: 'Parsed markdown in JSON form'
    })
    data?: any;
}