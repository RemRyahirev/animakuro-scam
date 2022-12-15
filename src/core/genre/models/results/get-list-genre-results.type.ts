import { Field, ObjectType } from 'type-graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Genre } from '../genre.model';

@ObjectType()
export class GetListGenreResultsType extends BaseResultsType {
    @Field(() => [Genre], {
        nullable: true,
        description: 'Genre list',
    })
    genreList: Genre[] | null;

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
