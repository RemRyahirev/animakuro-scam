import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Genre } from '../genre.model';

@ObjectType()
export class DeleteGenreResultsType extends BaseResultsType {
    @Field(() => Genre, {
        nullable: true,
        description: 'Genre',
    })
    genre: Genre | null;
}
