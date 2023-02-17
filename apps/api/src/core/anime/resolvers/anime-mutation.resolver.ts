import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { AnimeApproval, AnimeRelation } from '@app/common/models/enums';

import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { UpdateRatingAnimeResultsType } from '../models/results/update-rating-anime-result.type';
import { UpdateRatingAnimeInputType } from '../models/inputs/update-rating-anime-input.type';

import { AnimeMutationType, AnimeRootResolver } from './anime-root.resolver';

@Resolver(AnimeMutationType)
export class AnimeMutationResolver extends AnimeRootResolver {
    constructor(private animeService: AnimeService) {
        super();
    }

    @ResolveField(() => CreateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createAnime(
        @Args() args: CreateAnimeInputType,
        @AccessToken() user_id: string,
    ): Promise<CreateAnimeResultsType> {
        return await this.animeService.createAnime(args, user_id);
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAnime(
        @Args() args: UpdateAnimeInputType,
        @AccessToken() user_id: string,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateAnime(args, user_id);
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async addRelatedAnime(
        @Args('id') id: string,
        @Args({ name: 'relating_animes_add', type: () => [String] })
        relating_animes_add: string[],
        @Args({ name: 'related_status', type: () => [AnimeRelation] })
        related_status: AnimeRelation[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.addRelatedAnime(
            id,
            relating_animes_add,
            related_status,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateRelatedAnime(
        @Args('id') id: string,
        @Args({ name: 'relating_animes_add', type: () => [String] })
        relating_animes_add: string[],
        @Args({ name: 'related_status', type: () => [AnimeRelation] })
        related_status: AnimeRelation[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateRelatedAnime(
            id,
            relating_animes_add,
            related_status,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteRelatedAnime(
        @Args('id') id: string,
        @Args({ name: 'relating_animes_remove', type: () => [String] })
        relating_animes_remove: string[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.deleteRelatedAnime(
            id,
            relating_animes_remove,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async addSimilarAnime(
        @Args('id') id: string,
        @Args({ name: 'similar_animes_add', type: () => [String] })
        similar_animes_add: string[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.addSimilarAnime(id, similar_animes_add);
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateSimilarAnime(
        @Args('id') id: string,
        @Args({ name: 'similar_animes_add', type: () => [String] })
        similar_animes_add: string[],
        @Args({ name: 'related_status', type: () => [AnimeApproval] })
        status: AnimeApproval[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateSimilarAnime(
            id,
            similar_animes_add,
            status,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteSimilarAnime(
        @Args('id') id: string,
        @Args({ name: 'similar_animes_remove', type: () => [String] })
        similar_animes_remove: string[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.deleteSimilarAnime(
            id,
            similar_animes_remove,
        );
    }

    @ResolveField(() => DeleteAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteAnime(@Args('id') id: string): Promise<DeleteAnimeResultsType> {
        return await this.animeService.deleteAnime(id);
    }

    @ResolveField(() => UpdateRatingAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateRatingAnime(
        @Args() args: UpdateRatingAnimeInputType,
        @AccessToken() user_id: string,
    ): Promise<UpdateRatingAnimeResultsType> {
        return await this.animeService.updateRatingAnime({ ...args, user_id });
    }
}
