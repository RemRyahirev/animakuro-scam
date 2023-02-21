import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "../../../../common/models/results";
import { Stills } from "../stills.model";


@ObjectType()
export class DeleteAnimeStillsResultsType extends BaseResultsType {
    @Field(() => [Stills], {
        nullable: true,
        description: 'List of deleted stills'
    })
    stills?: Stills[]
}