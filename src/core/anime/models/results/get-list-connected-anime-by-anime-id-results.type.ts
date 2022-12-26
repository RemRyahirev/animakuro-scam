import { Field, ObjectType } from 'type-graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { AnimeConnectionType } from '../../../../common/models/types/anime-connection.type';

@ObjectType()
export class GetListConnectedAnimeByAnimeIdResultsType extends BaseResultsType {
    @Field(() => [AnimeConnectionType], {
        nullable: true,
        description: 'Connected anime list',
    })
    authorList: AnimeConnectionType[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
