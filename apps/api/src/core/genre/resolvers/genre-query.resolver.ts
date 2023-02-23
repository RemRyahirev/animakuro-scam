import { fieldsMap } from 'graphql-fields-list';
import { Args, Info, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';
import { GenreService } from '../services/genre.service';

import { GenreQueryType, GenreRootResolver } from './genre-root.resolver';

@Resolver(GenreQueryType)
export class GenreQueryResolver extends GenreRootResolver {
    constructor(private genreService: GenreService) {
        super();
    }

    @ResolveField(() => GetGenreResultsType, { middleware: [AuthMiddleware] })
    async getGenre(
        @Args('id') id: string,
        @Info() info: any,
        @AccessToken() userId: string,
    ): Promise<GetGenreResultsType> {
        return await this.genreService.getGenre(
            id,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListGenreResultsType, {
        middleware: [AuthMiddleware],
    })
    async getGenreList(
        @Args() args: PaginationInputType,
        @Info() info: any,
        @AccessToken() userId: string,
    ): Promise<GetListGenreResultsType> {
        return await this.genreService.getGenreList(
            args,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }
}
