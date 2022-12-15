import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Character } from "../character.model";

@ObjectType()
export class UpdateCharacterResultsType extends BaseResultsType {
    @Field(() => Character, {
        nullable: true,
        description: 'Character',
    })
    character: Character | null;
}
