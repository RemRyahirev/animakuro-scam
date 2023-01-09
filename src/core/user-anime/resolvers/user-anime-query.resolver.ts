import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    UserAnimeQueryType,
    UserAnimeRootResolver,
} from './user-anime-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserAnimeResultsType } from '../models/results/get-list-user-anime-results.type';
import { GetUserAnimeResultsType } from '../models/results/get-user-anime-results.type';
import { UserAnimeService } from '../services/user-anime.service';

@Resolver(UserAnimeQueryType)
export class UserAnimeQueryResolver extends UserAnimeRootResolver {
    constructor(private userAnimeService: UserAnimeService) {
        super();
    }

    @ResolveField(() => GetUserAnimeResultsType)
    async getUserAnime(
        @Args('id') id: string,
    ): Promise<GetUserAnimeResultsType> {
        return await this.userAnimeService.getUserAnime(id);
    }

    @ResolveField(() => GetListUserAnimeResultsType)
    async getUserAnimeList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserAnimeResultsType> {
        return await this.userAnimeService.getUserAnimeList(args);
    }
}
