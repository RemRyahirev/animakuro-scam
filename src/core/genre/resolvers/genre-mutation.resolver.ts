import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { ICustomContext } from '../../../common/models/interfaces';
import { GenreMutationType, GenreRootResolver } from './genre-root.resolver';
import { DeleteGenreResultsType } from '../models/results/delete-genre-results.type';
import { CreateGenreResultsType } from '../models/results/create-genre-results.type';
import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreResultsType } from '../models/results/update-genre-results.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';
import { GenreService } from '../services/genre.service';

@Resolver(GenreMutationType)
export class GenreMutationResolver extends GenreRootResolver {
    constructor(private genreService: GenreService) {
        super();
    }

    @ResolveField(() => CreateGenreResultsType)
    async createGenre(
        @Args() args: CreateGenreInputType,
        @Context() ctx: ICustomContext,
    ): Promise<CreateGenreResultsType> {
        return await this.genreService.createGenre(args, ctx);
    }

    @ResolveField(() => UpdateGenreResultsType)
    async updateGenre(
        @Args() args: UpdateGenreInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateGenreResultsType> {
        return await this.genreService.updateGenre(args, ctx);
    }

    @ResolveField(() => DeleteGenreResultsType)
    async deleteGenre(
        @Args('id') id: string,
        @Context() ctx: ICustomContext,
    ): Promise<DeleteGenreResultsType> {
        return await this.genreService.deleteGenre(id, ctx);
    }
}
