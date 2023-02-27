import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Genre } from '../../../genre/models/genre.model';

@ObjectType()
export class UpdateUserFavouriteGenresResultType extends BaseResultsType {
    @Field(() => [Genre], {
        nullable: true,
        description: 'User Profile list',
    })
    userFavouriteGenres: Genre[] | null;
}
