import { Field, ObjectType } from '@nestjs/graphql';
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
    genre_list: Genre[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
