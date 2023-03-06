import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseHistoryModel } from "../../user-profile/models/base-history.model";
import { Character } from "./character.model";

@ObjectType()
export class CharacterHistory extends BaseHistoryModel {
    @Field(() => ID)
    character_id: string;

    @Field(() => Character)
    character: Character;
}
