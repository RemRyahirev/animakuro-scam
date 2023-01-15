import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import {
    GenreQueryType,
    GenreRootResolver,
} from './airing-schedule-root.resolver';
import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';
import { GenreService } from '../services/genre.service';

@Resolver(GenreQueryType)
export class GenreQueryResolver extends GenreRootResolver {
    constructor(private genreService: GenreService) {
        super();
    }

    @ResolveField(() => GetGenreResultsType)
    async getGenre(@Args('id') id: string): Promise<GetGenreResultsType> {
        return await this.genreService.getGenre(id);
    }

    @ResolveField(() => GetListGenreResultsType)
    async getGenreList(
        @Args() args: PaginationInputType,
    ): Promise<GetListGenreResultsType> {
        return await this.genreService.getGenreList(args);
    }
}
