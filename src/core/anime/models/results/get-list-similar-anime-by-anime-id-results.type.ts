import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { SimilarAnime } from '../../../similar-anime/models/similar-anime.model';

@ObjectType()
export class GetListSimilarAnimeByAnimeIdResultsType extends BaseResultsType {
    @Field(() => [SimilarAnime], {
        nullable: true,
        description: 'Similar anime list',
    })
    anime_list: SimilarAnime[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
