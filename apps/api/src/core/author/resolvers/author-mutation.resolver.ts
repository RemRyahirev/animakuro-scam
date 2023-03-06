import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { CreateAuthorArgsType } from '../models/inputs/create-author-args.type';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { UpdateAuthorArgsType } from '../models/inputs/update-author-args.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { AuthorService } from '../services/author.service';

import { AuthorMutationType, AuthorRootResolver } from './author-root.resolver';

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
        @Args() args: CreateAuthorArgsType,
        @AccessToken() user_id: string,
    ): Promise<CreateAuthorResultsType> {
        return await this.authorService.createAuthor(args, user_id);
    }

    @ResolveField(() => UpdateAuthorResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAuthor(
        @Args() args: UpdateAuthorArgsType,
        @AccessToken() user_id: string,
    ): Promise<UpdateAuthorResultsType> {
        return await this.authorService.updateAuthor(args, user_id);
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
