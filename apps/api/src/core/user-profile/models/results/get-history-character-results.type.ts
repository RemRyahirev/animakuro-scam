import { BaseResultsType } from "@app/common/models/results";
import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterHistory } from "../../../character/models/history.model";



@ObjectType()
export class GetHistoryCharacterResultsType extends BaseResultsType {
    @Field(() => [CharacterHistory], {
        nullable: true,
        description: 'Character history list'
    })
    character_history_list?: CharacterHistory[];
}