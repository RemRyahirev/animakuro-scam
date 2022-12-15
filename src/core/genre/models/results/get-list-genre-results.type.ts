import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results/base-results.type';
import { PaginationResultsType } from '../../../../common/models/results/pagination-results.type';
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
