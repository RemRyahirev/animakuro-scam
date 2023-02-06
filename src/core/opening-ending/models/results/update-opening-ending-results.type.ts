import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { OpeningEnding } from "../opening-ending.model";


@ObjectType()
export class UpdateOpeningEndingResultsType extends BaseResultsType {
    @Field(() => OpeningEnding, {
        description: 'Updated opening/ending',
        nullable: true
    })
    ending: OpeningEnding | null;
}