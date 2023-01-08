import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { AuthorMutationType, AuthorRootResolver } from './author-root.resolver';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { AuthorService } from '../services/author.service';

@Resolver(AuthorMutationType)
export class AuthorMutationResolver extends AuthorRootResolver {
    constructor(private authorService: AuthorService) {
        super();
    }

    @ResolveField(() => CreateAuthorResultsType)
    async createAuthor(
        @Args() args: CreateAuthorInputType,
        @Context() ctx: ICustomContext,
    ): Promise<CreateAuthorResultsType> {
        return await this.authorService.createAuthor(args, ctx);
    }

    @ResolveField(() => UpdateAuthorResultsType)
    async updateAuthor(
        @Args() args: UpdateAuthorInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateAuthorResultsType> {
        return await this.authorService.updateAuthor(args, ctx);
    }

    @ResolveField(() => DeleteAuthorResultsType)
    async deleteAuthor(
        @Args('id') id: string,
        @Context() ctx: ICustomContext,
    ): Promise<DeleteAuthorResultsType> {
        return await this.authorService.deleteAuthor(id, ctx);
    }
}
