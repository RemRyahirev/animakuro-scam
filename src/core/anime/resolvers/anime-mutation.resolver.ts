import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthMiddleware } from 'common/middlewares/auth.middleware';
import { AccessToken } from 'common/decorators';
import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { AnimeMutationType, AnimeRootResolver } from './anime-root.resolver';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { AnimeApproval, AnimeRelation } from '../../../common/models/enums';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards';
import { UpdateRatingAnimeResultsType } from '../models/results/update-rating-anime-result.type';
import { UpdateRatingAnimeInputType } from '../models/inputs/update-rating-anime-input.type';
import { AddAnimeStillsResultsType } from '../models/results/add-anime-stills-results.type';
import { AddAnimeStillsInputType } from '../models/inputs/add-anime-stills-input.type';
import { DeleteAnimeStillsResultsType } from '../models/results/delete-anime-stills-results.type';
import { DeleteAnimeStillsInputType } from '../models/inputs/delete-anime-stills-input.type';
import { UpdateAnimeStillsInputType } from '../models/inputs/update-anime-stills-input.type';
import { UpdateAnimeStillsResultsType } from '../models/results/update-anime-stills-results.type';

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

    @ResolveField(() => AddAnimeStillsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async addAnimeStills(
        @Args() args: AddAnimeStillsInputType,
        @AccessToken() user_id: string,
    ) {
        return await this.animeService.addAnimeStills(args, user_id);
    }

    @ResolveField(() => UpdateAnimeStillsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAnimeStills(
        @Args() args: UpdateAnimeStillsInputType,
        @AccessToken() user_id: string,
    ) {
        return await this.animeService.updateAnimeStills(args, user_id);
    }

    @ResolveField(() => DeleteAnimeStillsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteAnimeStills(
        @Args() args: DeleteAnimeStillsInputType,
        @AccessToken() user_id: string,
    ) {
        return await this.animeService.deleteAnimeStills(args, user_id);
    }
}
