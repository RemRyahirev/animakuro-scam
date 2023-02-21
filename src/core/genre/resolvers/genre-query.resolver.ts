import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import { GenreQueryType, GenreRootResolver } from './genre-root.resolver';
import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';
import { GenreService } from '../services/genre.service';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { AccessToken } from '../../../common/decorators';

@Resolver(GenreQueryType)
export class GenreQueryResolver extends GenreRootResolver {
    constructor(private genreService: GenreService) {
        super();
    }

    @ResolveField(() => GetGenreResultsType, { middleware: [AuthMiddleware] })
    async getGenre(
        @Args('id') id: string,
        @AccessToken() userId: string,
    ): Promise<GetGenreResultsType> {
        return await this.genreService.getGenre(id, userId);
    }

    @ResolveField(() => GetListGenreResultsType, {
        middleware: [AuthMiddleware],
    })
    async getGenreList(
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
    ): Promise<GetListGenreResultsType> {
        return await this.genreService.getGenreList(args, userId);
    }
}
