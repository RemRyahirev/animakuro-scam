import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Character } from '../character.model';

@ObjectType()
export class CreateCharacterResultsType extends BaseResultsType {
    @Field(() => Character, {
        nullable: true,
        description: 'Character',
    })
    character: Character | null;
}
