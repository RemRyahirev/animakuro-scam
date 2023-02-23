import { fieldsMap } from 'graphql-fields-list';
import { Args, Info, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { GetAnimeByIdInputType } from '../models/inputs/get-anime-by-id-input.type';
import { GetStillsByAnimeIdResultsType } from '../models/results/get-stills-by-animeId-results.type';
import { GetStillsByAnimeIdInputType } from '../models/inputs/get-stills-by-animeId-input.type';
import { GetAnimeListInputType } from '../models/inputs/get-anime-list-input.type';

import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';

@Resolver(AnimeQueryType)
export class AnimeQueryResolver extends AnimeRootResolver {
    constructor(private animeService: AnimeService) {
        super();
    }

    @ResolveField(() => GetAnimeResultsType, { middleware: [AuthMiddleware] })
    async getAnime(
        @Args() args: GetAnimeByIdInputType,
        @AccessToken() userId: string,
        @Info() info: any,
    ): Promise<GetAnimeResultsType> {
        return await this.animeService.getAnime(
            args,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    async getAnimeList(
        @Args() input: GetAnimeListInputType,
        @Args() args: PaginationInputType,
        @Info() info: any,
        @AccessToken() userId: string,
    ): Promise<GetListAnimeResultsType> {
        return await this.animeService.getAnimeList(
            input,
            args,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListRelatedAnimeByAnimeIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getRelatedAnimeListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
    ): Promise<GetListRelatedAnimeByAnimeIdResultsType> {
        return await this.animeService.getRelatedAnimeListByAnimeId(
            id,
            args,
            userId,
        );
    }

    @ResolveField(() => GetListSimilarAnimeByAnimeIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getSimilarAnimeListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
    ): Promise<GetListSimilarAnimeByAnimeIdResultsType> {
        return await this.animeService.getSimilarAnimeListByAnimeId(
            id,
            args,
            userId,
        );
    }

    @ResolveField(() => GetStillsByAnimeIdResultsType)
    async getStillsByAnimeId(
        @Args() args: GetStillsByAnimeIdInputType,
        @Args() pagination: PaginationInputType,
    ) {
        return await this.animeService.getStillsByAnimeId(args, pagination);
    }
}
