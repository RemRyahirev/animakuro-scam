import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetListConnectedAnimeByAnimeIdResultsType } from '../models/results/get-list-connected-anime-by-anime-id-results.type';

import { GetAnimeResultsType } from '../models/results/get-anime-results.type';

@Resolver(AnimeQueryType)
export class AnimeQueryResolver extends AnimeRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetAnimeResultsType)
    async getAnime(@Arg('id') id: string): Promise<GetAnimeResultsType> {
        return await this.animeService.getAnime(id);
    }

    @FieldResolver(() => GetListAnimeResultsType)
    async getAnimeList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAnimeResultsType> {
        return await this.animeService.getAnimeList(args);
    }

    @FieldResolver(() => GetListConnectedAnimeByAnimeIdResultsType)
    async getConnectedAnimeListByAnimeId(
        @Arg('id') id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListConnectedAnimeByAnimeIdResultsType> {
        return await this.animeService.getConnectedAnimeListByAnimeId(id, args);
    }
}
