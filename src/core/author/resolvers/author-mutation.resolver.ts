import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthMiddleware } from 'common/middlewares/auth.middleware';
import { AccessToken } from 'common/decorators';
import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { AuthorMutationType, AuthorRootResolver } from './author-root.resolver';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { AuthorService } from '../services/author.service';

@Resolver(AuthorMutationType)
export class AuthorMutationResolver extends AuthorRootResolver {
    constructor(private authorService: AuthorService) {
        super();
    }

    @ResolveField(() => CreateAuthorResultsType, {
        middleware: [AuthMiddleware],
    })
    async createAuthor(
        @Args() args: CreateAuthorInputType,
        @AccessToken() user_id: string,
    ): Promise<CreateAuthorResultsType> {
        return await this.authorService.createAuthor(args, user_id);
    }

    @ResolveField(() => UpdateAuthorResultsType, {
        middleware: [AuthMiddleware],
    })
    async updateAuthor(
        @Args() args: UpdateAuthorInputType,
        @AccessToken() user_id: string,
    ): Promise<UpdateAuthorResultsType> {
        return await this.authorService.updateAuthor(args, user_id);
    }

    @ResolveField(() => DeleteAuthorResultsType)
    async deleteAuthor(
        @Args('id') id: string,
    ): Promise<DeleteAuthorResultsType> {
        return await this.authorService.deleteAuthor(id);
    }
}
