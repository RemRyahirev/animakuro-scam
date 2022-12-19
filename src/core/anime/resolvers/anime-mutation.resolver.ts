import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { AnimeMutationType, AnimeRootResolver } from './anime-root.resolver';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';

@Resolver(AnimeMutationType)
export class AnimeMutationResolver extends AnimeRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateAnimeResultsType)
    async createAnime(
        @Args() args: CreateAnimeInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateAnimeResultsType> {
        return await this.animeService.createAnime(args, ctx);
    }

    @FieldResolver(() => UpdateAnimeResultsType)
    async updateAnime(
        @Args() args: UpdateAnimeInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateAnime(args, ctx);
    }

    @FieldResolver(() => DeleteAnimeResultsType)
    async deleteAnime(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteAnimeResultsType> {
        return await this.animeService.deleteAnime(id, ctx);
    }
}
