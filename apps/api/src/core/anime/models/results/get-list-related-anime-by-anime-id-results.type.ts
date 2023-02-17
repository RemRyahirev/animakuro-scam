import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { RelatingAnime } from '../../../relating-anime/models/relating-anime.model';

@ObjectType()
export class GetListRelatedAnimeByAnimeIdResultsType extends BaseResultsType {
    @Field(() => [RelatingAnime], {
        nullable: true,
        description: 'Related anime list',
    })
    anime_list: RelatingAnime[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
