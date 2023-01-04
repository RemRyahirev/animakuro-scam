import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { UserAnimeQueryType, UserAnimeRootResolver } from './user-anime-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserAnimeResultsType } from '../models/results/get-list-user-anime-results.type';
import { GetUserAnimeResultsType } from '../models/results/get-user-anime-results.type';

@Resolver(UserAnimeQueryType)
export class UserAnimeQueryResolver extends UserAnimeRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetUserAnimeResultsType)
    async getUserAnime(@Arg('id') id: string): Promise<GetUserAnimeResultsType> {
        return await this.userAnimeService.getUserAnime(id);
    }

    @FieldResolver(() => GetListUserAnimeResultsType)
    async getUserAnimeList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserAnimeResultsType> {
        return await this.userAnimeService.getUserAnimeList(args);
    }
}
