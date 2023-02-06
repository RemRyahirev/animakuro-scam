import { BaseResultsType } from "../../../../common/models/results/index";
import { Field, ObjectType } from "@nestjs/graphql";
import { Opening } from "../opening.model";


@ObjectType()
export class GetOpeningResultsType extends BaseResultsType {
    @Field(() => Opening, {
        description: 'Exact opening',
        nullable: true
    })
    ending: Opening | null;
}