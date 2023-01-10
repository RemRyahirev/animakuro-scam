import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { AnimeMutationType, AnimeRootResolver } from './anime-root.resolver';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { AnimeService } from '../services/anime.service';

@Resolver(AnimeMutationType)
export class AnimeMutationResolver extends AnimeRootResolver {
    constructor(private animeService: AnimeService) {
        super();
    }

    @ResolveField(() => CreateAnimeResultsType)
    async createAnime(
        @Args() args: CreateAnimeInputType,
        @Context() ctx: ICustomContext,
    ): Promise<CreateAnimeResultsType> {
        return await this.animeService.createAnime(args, ctx);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async updateAnime(
        @Args() args: UpdateAnimeInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateAnime(args, ctx);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async addRelatedAnime(
        @Args() args: UpdateAnimeInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.addRelatedAnime(args, ctx);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async deleteRelatedAnime(
        @Args() args: UpdateAnimeInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.deleteRelatedAnime(args, ctx);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async addSimilarAnime(
        @Args() args: UpdateAnimeInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.addSimilarAnime(args, ctx);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async deleteSimilarAnime(
        @Args() args: UpdateAnimeInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.deleteSimilarAnime(args, ctx);
    }

    @ResolveField(() => DeleteAnimeResultsType)
    async deleteAnime(
        @Args('id') id: string,
        @Context() ctx: ICustomContext,
    ): Promise<DeleteAnimeResultsType> {
        return await this.animeService.deleteAnime(id, ctx);
    }
}
