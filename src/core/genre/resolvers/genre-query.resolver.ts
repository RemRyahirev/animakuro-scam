import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import { GenreQueryType, GenreRootResolver } from './genre-root.resolver';
import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';

@Resolver(GenreQueryType)
export class GenreQueryResolver extends GenreRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetGenreResultsType)
    async getGenre(@Arg('id') id: string): Promise<GetGenreResultsType> {
        const genre = await this.genreService.getGenre(id);
        if (!genre) {
            return {
                success: false,
                genre: null,
                errors: ['Anime not found'],
            };
        }
        return {
            success: true,
            genre,
            errors: [],
        };
    }

    @FieldResolver(() => GetListGenreResultsType)
    async getGenreList(
        @Args() args: PaginationInputType,
    ): Promise<GetListGenreResultsType> {
        const genreList = await this.genreService.getGenreList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            genreList,
            pagination,
        };
    }
}
