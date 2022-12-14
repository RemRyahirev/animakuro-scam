import { Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { CreateAnimeInputType } from '../inputs/create-anime-input.type';
import { AnimeMutationType, AnimeRootResolver } from './anime-root.resolver';
import { CreateAnimeResultsType } from '../results/create-anime-results.type';
import { ICustomContext } from '../../../common/types/interfaces/custom-context.interface';

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
}
