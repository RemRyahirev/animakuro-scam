import { BaseResultsType, PaginationResultsType } from "../../../../common/models/results";
import { Field, ObjectType } from '@nestjs/graphql';
import { CatalogAnime } from "../catalog-anime.model";

@ObjectType()
export class GetListCatalogAnimeResultsType extends BaseResultsType {
    @Field(() => [CatalogAnime], {
        nullable: true,
        description: 'Catalog Anime list',
    })
    animeList: CatalogAnime[];
    pagination: PaginationResultsType;
}
