import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Anime } from '../anime.model';

@ObjectType()
export class GetListAnimeResultsType extends BaseResultsType {
    @Field(() => [Anime], {
        nullable: true,
        description: 'Anime list',
    })
    animeList: Anime[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
