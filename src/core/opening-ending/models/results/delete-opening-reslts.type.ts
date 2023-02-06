import { Opening } from "../opening.model";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "../../../../common/models/results/index";

@ObjectType()
export class DeleteOpeningResultsType extends BaseResultsType {
    @Field(() => Opening, {
        description: 'Deleted opening',
        nullable: true
    })
    opening: Opening | null;
}