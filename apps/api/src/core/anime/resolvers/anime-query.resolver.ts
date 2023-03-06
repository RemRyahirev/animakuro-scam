import { fieldsMap } from 'graphql-fields-list';
import { Args, Info, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ProfileId } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationArgsType } from '@app/common/models/inputs';

import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { GetAnimeByIdArgsType } from '../models/inputs/get-anime-by-id-args.type';
import { GetStillsByAnimeIdResultsType } from '../models/results/get-stills-by-animeId-results.type';
import { GetStillsByAnimeIdArgsType } from '../models/inputs/get-stills-by-anime-id-args.type';
import { GetAnimeListArgsType } from '../models/inputs/get-anime-list-args.type';

import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';

@Resolver(AnimeQueryType)
export class AnimeQueryResolver extends AnimeRootResolver {
    constructor(private animeService: AnimeService) {
        super();
    }

    @ResolveField(() => GetAnimeResultsType, { middleware: [AuthMiddleware] })
    async getAnime(
        @Args() args: GetAnimeByIdArgsType,
        @AccessToken() userId: string,
        @ProfileId() profileId: string,
        @Info() info: any,
    ): Promise<GetAnimeResultsType> {
        return await this.animeService.getAnime(
            args,
            userId,
            profileId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    async getAnimeList(
        @Args() input: GetAnimeListArgsType,
        @Args() args: PaginationArgsType,
        @Info() info: any,
        @AccessToken() userId: string,
        @ProfileId() profileId: string,
    ): Promise<GetListAnimeResultsType> {
        return await this.animeService.getAnimeList(
            input,
            args,
            userId,
            profileId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListRelatedAnimeByAnimeIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getRelatedAnimeListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationArgsType,
        @AccessToken() userId: string,
        @ProfileId() profileId: string,
    ): Promise<GetListRelatedAnimeByAnimeIdResultsType> {
        return await this.animeService.getRelatedAnimeListByAnimeId(
            id,
            args,
            userId,
            profileId,
        );
    }

    @ResolveField(() => GetListSimilarAnimeByAnimeIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getSimilarAnimeListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationArgsType,
        @AccessToken() userId: string,
        @ProfileId() profileId: string,
    ): Promise<GetListSimilarAnimeByAnimeIdResultsType> {
        return await this.animeService.getSimilarAnimeListByAnimeId(
            id,
            args,
            userId,
            profileId,
        );
    }

    @ResolveField(() => GetStillsByAnimeIdResultsType)
    async getStillsByAnimeId(
        @Args() args: GetStillsByAnimeIdArgsType,
        @Args() pagination: PaginationArgsType,
    ) {
        return await this.animeService.getStillsByAnimeId(args, pagination);
    }
}
