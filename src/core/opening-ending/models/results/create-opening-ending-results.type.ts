import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { OpeningEnding } from "../opening-ending.model";


@ObjectType()
export class CreateOpeningEndingResultsType extends BaseResultsType {
    @Field(() => OpeningEnding, {
        description: 'Created opening/ending',
        nullable: true
    })
    opening_ending: OpeningEnding | null;
}