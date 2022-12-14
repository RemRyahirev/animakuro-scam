import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../common/results/base-results.type';
import { Genre } from '../schemas/genre.schema';

@ObjectType()
export class UpdateGenreResultsType extends BaseResultsType {
    @Field(() => Genre, {
        nullable: true,
        description: 'Genre',
    })
    genre: Genre | null;
}
