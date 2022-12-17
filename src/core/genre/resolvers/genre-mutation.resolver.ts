import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { ICustomContext } from '../../../common/models/interfaces';
import { GenreMutationType, GenreRootResolver } from './genre-root.resolver';
import { DeleteGenreResultsType } from '../models/results/delete-genre-results.type';
import { CreateGenreResultsType } from '../models/results/create-genre-results.type';
import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreResultsType } from '../models/results/update-genre-results.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';

@Resolver(GenreMutationType)
export class GenreMutationResolver extends GenreRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateGenreResultsType)
    async createGenre(
        @Args() args: CreateGenreInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateGenreResultsType> {
        return await this.genreService.createGenreInfo(args, ctx);
    }

    @FieldResolver(() => UpdateGenreResultsType)
    async updateGenre(
        @Args() args: UpdateGenreInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateGenreResultsType> {
        return await this.genreService.updateGenreInfo(args, ctx);
    }

    @FieldResolver(() => DeleteGenreResultsType)
    async deleteGenre(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteGenreResultsType> {
        return await this.genreService.deleteGenreInfo(id, ctx);
    }
}
