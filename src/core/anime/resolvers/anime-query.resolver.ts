import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { GetAnimeByIdInputType } from '../models/inputs/get-anime-by-id-input.type';

@Resolver(AnimeQueryType)
export class AnimeQueryResolver extends AnimeRootResolver {
    constructor(private animeService: AnimeService) {
        super();
    }

    @ResolveField(() => GetAnimeResultsType)
    async getAnime(
        @Args() args: GetAnimeByIdInputType,
    ): Promise<GetAnimeResultsType> {
        return await this.animeService.getAnime(args);
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

    @ResolveField(() => GetListSimilarAnimeByAnimeIdResultsType)
    async getSimilarAnimeListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListSimilarAnimeByAnimeIdResultsType> {
        return await this.animeService.getSimilarAnimeListByAnimeId(id, args);
    }
}
