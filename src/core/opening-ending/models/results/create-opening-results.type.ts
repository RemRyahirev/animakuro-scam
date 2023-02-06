import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { Opening } from "../opening.model";


@ObjectType()
export class CreateOpeningResultsType extends BaseResultsType {
    @Field(() => Opening, {
        description: 'Created opening',
        nullable: true
    })
    ending: Opening | null;
}