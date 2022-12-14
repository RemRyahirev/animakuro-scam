import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { PaginationInputType } from '../../../common/inputs/pagination-input.type';
import { GenreQueryType, GenreRootResolver } from './genre-root.resolver';
import { GetListGenreResultsType } from '../results/get-list-genre-results.type';
import { GetGenreResultsType } from '../results/get-genre-results.type';

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
        @Args() pagination: PaginationInputType,
    ): Promise<GetListGenreResultsType> {
        const genreList = await this.genreService.getGenreList(pagination);
        return {
            success: true,
            errors: [],
            genreList,
        };
    }
}
