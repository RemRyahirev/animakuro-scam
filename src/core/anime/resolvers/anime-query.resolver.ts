import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { GetAnimeByIdInputType } from '../models/inputs/get-anime-by-id-input.type';
import { GetStillsByAnimeIdResultsType } from '../models/results/get-stills-by-animeId-results.type';
import { GetStillsByAnimeIdInputType } from '../models/inputs/get-stills-by-animeId-input.type';
import { GetAnimeListInputType } from '../models/inputs/get-anime-list-input.type';

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
        @Args() input: GetAnimeListInputType,
        @Args() args: PaginationInputType,
    ): Promise<GetListAnimeResultsType> {
        return await this.animeService.getAnimeList(input, args);
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

    @ResolveField(() => GetStillsByAnimeIdResultsType)
    async getStillsByAnimeId(
        @Args() args: GetStillsByAnimeIdInputType,
        @Args() pagination: PaginationInputType,
    ) {
        return await this.animeService.getStillsByAnimeId(args, pagination);
    }

}
