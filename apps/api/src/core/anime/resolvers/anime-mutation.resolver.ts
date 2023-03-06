import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { AnimeApproval, AnimeRelation } from '@app/common/models/enums';

import { CreateAnimeArgsType } from '../models/inputs/create-anime-args.type';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { UpdateAnimeArgsType } from '../models/inputs/update-anime-args.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { UpdateRatingAnimeResultsType } from '../models/results/update-rating-anime-result.type';
import { UpdateRatingAnimeArgsType } from '../models/inputs/update-rating-anime-args.type';
import { AddAnimeStillsResultsType } from '../models/results/add-anime-stills-results.type';
import { AddAnimeStillsArgsType } from '../models/inputs/add-anime-stills-args.type';
import { DeleteAnimeStillsResultsType } from '../models/results/delete-anime-stills-results.type';
import { DeleteAnimeStillsArgsType } from '../models/inputs/delete-anime-stills-args.type';
import { UpdateAnimeStillsArgsType } from '../models/inputs/update-anime-stills-args.type';
import { UpdateAnimeStillsResultsType } from '../models/results/update-anime-stills-results.type';

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
        @Args() args: CreateAnimeArgsType,
        @AccessToken() user_id: string,
    ): Promise<CreateAnimeResultsType> {
        return await this.animeService.createAnime(args, user_id);
    }

    @ResolveField(() => UpdateAnimeResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAnime(
        @Args() args: UpdateAnimeArgsType,
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
        @Args() args: UpdateRatingAnimeArgsType,
        @ProfileId() user_profile_id: string,
    ): Promise<UpdateRatingAnimeResultsType> {
        return await this.animeService.updateRatingAnime({ ...args, user_profile_id });
    }

    @ResolveField(() => AddAnimeStillsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async addAnimeStills(
        @Args() args: AddAnimeStillsArgsType,
        @AccessToken() user_id: string,
    ) {
        return await this.animeService.addAnimeStills(args, user_id);
    }

    @ResolveField(() => UpdateAnimeStillsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAnimeStills(
        @Args() args: UpdateAnimeStillsArgsType,
        @AccessToken() user_id: string,
    ) {
        return await this.animeService.updateAnimeStills(args, user_id);
    }

    @ResolveField(() => DeleteAnimeStillsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteAnimeStills(
        @Args() args: DeleteAnimeStillsArgsType,
        @AccessToken() user_id: string,
    ) {
        return await this.animeService.deleteAnimeStills(args, user_id);
    }
}
