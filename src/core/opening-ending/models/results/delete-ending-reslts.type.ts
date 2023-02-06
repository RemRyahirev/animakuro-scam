import { Ending } from "../ending.model";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "../../../../common/models/results/index";

@ObjectType()
export class DeleteEndingResultsType extends BaseResultsType{
    @Field(() => Ending, {
        description: 'Deleted ending',
        nullable: true
    })
    opening: Ending | null;
}