import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Field, ObjectType } from '@nestjs/graphql';
import { Anime } from '../../../anime/models/anime.model';

@ObjectType()
export class GetCatalogAnimeResultsType extends BaseResultsType {
    @Field(() => [Anime], {
        nullable: true,
        description: 'Catalog Anime list',
    })
    animeList: Anime[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
