import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { Anime } from '../../../anime/models/anime.model';

@ObjectType()
export class GetCatalogAnimeResultsType extends BaseResultsType {
    @Field(() => [Anime], {
        nullable: true,
        description: 'Catalog Anime list',
    })
    anime_list: Anime[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
