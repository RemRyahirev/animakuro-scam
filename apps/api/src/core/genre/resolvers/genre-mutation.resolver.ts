import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { DeleteGenreResultsType } from '../models/results/delete-genre-results.type';
import { CreateGenreResultsType } from '../models/results/create-genre-results.type';
import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreResultsType } from '../models/results/update-genre-results.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';
import { GenreService } from '../services/genre.service';

import { GenreMutationType, GenreRootResolver } from './genre-root.resolver';

@Resolver(GenreMutationType)
export class GenreMutationResolver extends GenreRootResolver {
    constructor(private genreService: GenreService) {
        super();
    }

    @ResolveField(() => CreateGenreResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createGenre(
        @Args() args: CreateGenreInputType,
    ): Promise<CreateGenreResultsType> {
        return await this.genreService.createGenre(args);
    }

    @ResolveField(() => UpdateGenreResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateGenre(
        @Args() args: UpdateGenreInputType,
    ): Promise<UpdateGenreResultsType> {
        return await this.genreService.updateGenre(args);
    }

    @ResolveField(() => DeleteGenreResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteGenre(
        @Args('id') id: string,
    ): Promise<DeleteGenreResultsType> {
        return await this.genreService.deleteGenre(id);
    }
}
