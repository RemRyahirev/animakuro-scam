import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Anime } from '../../../anime/models/anime.model';

@ObjectType()
export class UpdateUserFavouriteAnimesResultType extends BaseResultsType {
    @Field(() => [Anime], {
        nullable: true,
        description: 'User Profile list',
    })
    userFavouriteAnimes: Anime[] | null;
}
