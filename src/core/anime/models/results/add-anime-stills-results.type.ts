import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "../../../../common/models/results";
import { Stills } from "../stills.model";


@ObjectType()
export class AddAnimeStillsResultsType extends BaseResultsType {
    @Field(() => [Stills], {
        description: 'Added stills'
    })
    stills: Stills[];
}