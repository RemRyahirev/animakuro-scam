import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { OpeningEnding } from "../opening-ending.model";


@ObjectType()
export class GetOpeningEndingResultsType extends BaseResultsType {
    @Field(() => OpeningEnding, {
        description: 'Exact opening/ending',
        nullable: true
    })
    ending: OpeningEnding | null;
}