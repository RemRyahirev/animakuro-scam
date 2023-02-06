import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { Ending } from "../ending.model";


@ObjectType()
export class GetEndingResultsType extends BaseResultsType {
    @Field(() => Ending, {
        description: 'Exact ending',
        nullable: true
    })
    ending: Ending | null;
}