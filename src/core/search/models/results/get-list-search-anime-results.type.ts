import { BaseResultsType } from '../../../../common/models/results';
import { SearchAnime } from '../search.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetListSearchAnimeResultsType extends BaseResultsType {
    @Field(() => [SearchAnime], {
        nullable: true,
        description: 'Search Anime list',
    })
    animeList: SearchAnime[];
}
