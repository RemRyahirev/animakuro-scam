import { Field, ObjectType } from 'type-graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Anime } from '../anime.model';
import { AnimeRelation } from '../../../../common/models/enums/anime-relation.enum';

@ObjectType()
export class GetListRelatedAnimeByAnimeIdResultsType extends BaseResultsType {
    @Field(() => [Anime], {
        nullable: true,
        description: 'Related anime list',
    })
    related_animes: Anime[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
