import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { AnimeService } from '../services/anime.service';

@Resolver(AnimeQueryType)
export class AnimeQueryResolver extends AnimeRootResolver {
    constructor(private animeService: AnimeService) {
        super();
    }

    @ResolveField(() => GetAnimeResultsType)
    async getAnime(@Args('id') id: string): Promise<GetAnimeResultsType> {
        return await this.animeService.getAnime(id);
    }

    @ResolveField(() => GetListAnimeResultsType)
    async getAnimeList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAnimeResultsType> {
        return await this.animeService.getAnimeList(args);
    }

    @ResolveField(() => GetListRelatedAnimeByAnimeIdResultsType)
    async getRelatedAnimeListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListRelatedAnimeByAnimeIdResultsType> {
        return await this.animeService.getRelatedAnimeListByAnimeId(id, args);
    }
}
