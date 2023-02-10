import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { AuthorMutationType, AuthorRootResolver } from './author-root.resolver';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { AuthorService } from '../services/author.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
@Resolver(AuthorMutationType)
export class AuthorMutationResolver extends AuthorRootResolver {
    constructor(private authorService: AuthorService) {
        super();
    }

    @ResolveField(() => CreateAuthorResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createAuthor(
        @Args() args: CreateAuthorInputType,
    ): Promise<CreateAuthorResultsType> {
        return await this.authorService.createAuthor(args);
    }

    @ResolveField(() => UpdateAuthorResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAuthor(
        @Args() args: UpdateAuthorInputType,
    ): Promise<UpdateAuthorResultsType> {
        return await this.authorService.updateAuthor(args);
    }

    @ResolveField(() => DeleteAuthorResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteAuthor(
        @Args('id') id: string,
    ): Promise<DeleteAuthorResultsType> {
        return await this.authorService.deleteAuthor(id);
    }
}
