import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Character } from '../../../character/models/character.model';

@ObjectType()
export class UpdateUserFavouriteCharactersResultType extends BaseResultsType {
    @Field(() => [Character], {
        nullable: true,
        description: 'User Profile list',
    })
    userFavouriteCharacters: Character[] | null;
}
