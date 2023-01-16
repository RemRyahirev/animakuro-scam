import { BaseResultsType } from '../../../../common/models/results';
import { Field, ObjectType } from '@nestjs/graphql';
import { CatalogAnime } from "../catalog-anime.model";

@ObjectType()
export class GetListSearchAnimeResultsType extends BaseResultsType {
    @Field(() => [CatalogAnime], {
        nullable: true,
        description: 'Search Anime list',
    })
    animeList: CatalogAnime[];
}
