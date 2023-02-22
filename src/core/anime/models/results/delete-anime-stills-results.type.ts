import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "../../../../common/models/results";


@ObjectType()
export class DeleteAnimeStillsResultsType extends BaseResultsType {
    @Field(() => Int, {
        nullable: true,
        description: 'List of deleted stills'
    })
    count?: number
}