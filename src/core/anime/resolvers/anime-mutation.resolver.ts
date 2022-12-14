import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { CreateAnimeInputType } from '../inputs/create-anime-input.type';
import { AnimeMutationType, AnimeRootResolver } from './anime-root.resolver';
import { CreateAnimeResultsType } from '../results/create-anime-results.type';
import { ICustomContext } from '../../../common/types/interfaces/custom-context.interface';
import { UpdateAnimeResultsType } from '../results/update-anime-results.type';
import { UpdateAnimeInputType } from '../inputs/update-anime-input.type';
import { DeleteAnimeResultsType } from '../results/delete-anime-results.type';

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
        const anime = await this.animeService.createAnime(args);
        return {
            success: true,
            anime,
        };
    }

    @FieldResolver(() => UpdateAnimeResultsType)
    async updateAnime(
        @Args() args: UpdateAnimeInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        const anime = await this.animeService.updateAnime(args);
        return {
            success: true,
            anime,
        };
    }

    @FieldResolver(() => DeleteAnimeResultsType)
    async deleteAnime(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteAnimeResultsType> {
        const anime = await this.animeService.deleteAnime(id);
        return {
            success: true,
            anime,
        };
    }
}
