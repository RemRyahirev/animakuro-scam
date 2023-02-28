import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultsType } from "@app/common/models/results";
import { AnimeHistory } from "../../../anime/models/history.model";
import { CharacterHistory } from "../../../character/models/history.model";


@ObjectType()
export class AddHistoryCharacterResultsType extends BaseResultsType {
    @Field(() => CharacterHistory, {
        nullable: true,
        description: 'Created history'
    })
    character_history?: CharacterHistory | null;
}