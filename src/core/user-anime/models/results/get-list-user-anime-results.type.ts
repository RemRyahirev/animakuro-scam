import { Field, ObjectType } from 'type-graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { UserAnime } from '../user-anime.model';

@ObjectType()
export class GetListUserAnimeResultsType extends BaseResultsType {
    @Field(() => [UserAnime], {
        nullable: true,
        description: 'User Anime list',
    })
    userAnimeList: UserAnime[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
