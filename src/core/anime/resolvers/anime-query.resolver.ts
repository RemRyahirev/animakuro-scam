import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';
import { PaginationInputType } from '../../../common/inputs/pagination-input.type';
import { GetListAnimeResultsType } from '../results/get-list-anime-results.type';
import { GetAnimeResultsType } from '../results/get-anime-results.type';

@Resolver(AnimeQueryType)
export class AnimeQueryResolver extends AnimeRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetAnimeResultsType)
    async getAnime(@Arg('id') id: string): Promise<GetAnimeResultsType> {
        const anime = await this.animeService.getAnime(id);
        if (!anime) {
            return {
                success: false,
                anime: null,
                errors: ['Anime not found'],
            };
        }
        return {
            success: true,
            anime,
            errors: [],
        };
    }

    @FieldResolver(() => GetListAnimeResultsType)
    async getAnimeList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAnimeResultsType> {
        const animeList = await this.animeService.getAnimeList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            animeList,
            pagination,
        };
    }
}
