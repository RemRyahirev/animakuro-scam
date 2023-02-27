import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Genre } from '../genre.model';

@ObjectType()
export class DeleteGenreResultsType extends BaseResultsType {
    @Field(() => Genre, {
        nullable: true,
        description: 'Genre',
    })
    genre: Genre | null;
}
