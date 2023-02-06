import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { Opening } from "../opening.model";


@ObjectType()
export class UpdateOpeningResultsType extends BaseResultsType {
    @Field(() => Opening, {
        description: 'Updated opening',
        nullable: true
    })
    ending: Opening | null;
}