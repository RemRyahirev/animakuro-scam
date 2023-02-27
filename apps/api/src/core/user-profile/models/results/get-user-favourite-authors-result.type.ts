import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Author } from '../../../author/models/author.model';

@ObjectType()
export class UpdateUserFavouriteAuthorsResultType extends BaseResultsType {
    @Field(() => [Author], {
        nullable: true,
        description: 'User Profile list',
    })
    userFavouriteAuthors: Author[] | null;
}
