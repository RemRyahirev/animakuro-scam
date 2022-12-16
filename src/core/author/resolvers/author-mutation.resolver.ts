import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { AuthorMutationType, AuthorRootResolver } from './author-root.resolver';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';

@Resolver(AuthorMutationType)
export class AuthorMutationResolver extends AuthorRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateAuthorResultsType)
    async createAuthor(
        @Args() args: CreateAuthorInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateAuthorResultsType> {
        const author = await this.authorService.createAuthor(args);
        return {
            success: true,
            author,
        };
    }

    @FieldResolver(() => UpdateAuthorResultsType)
    async updateAuthor(
        @Args() args: UpdateAuthorInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateAuthorResultsType> {
        const author = await this.authorService.updateAuthor(args);
        return {
            success: true,
            author,
        };
    }

    @FieldResolver(() => DeleteAuthorResultsType)
    async deleteAuthor(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteAuthorResultsType> {
        const author = await this.authorService.deleteAuthor(id);
        return {
            success: true,
            author,
        };
    }
}
