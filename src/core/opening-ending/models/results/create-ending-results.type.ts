import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { Ending } from "../ending.model";


@ObjectType()
export class CreateEndingResultsType extends BaseResultsType {
    @Field(() => Ending, {
        description: 'Created ending',
        nullable: true
    })
    ending: Ending | null;
}