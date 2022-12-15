import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results/base-results.type';
import { PaginationResultsType } from '../../../../common/models/results/pagination-results.type';
import { Anime } from '../anime.model';

@ObjectType()
export class GetListAnimeResultsType extends BaseResultsType {
    @Field(() => [Anime], {
        nullable: true,
        description: 'Anime list',
    })
    animeList: Anime[] | null;

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
