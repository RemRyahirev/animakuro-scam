import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "../../../../common/models/results";
import { Stills } from "../stills.model";


@ObjectType()
export class AddAnimeStillsResultsType extends BaseResultsType {
    @Field(() => Int, {
        description: 'Added stills count'
    })
    count: number;
}