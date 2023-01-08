import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorQueryType, AuthorRootResolver } from './author-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListAuthorResultsType } from '../models/results/get-list-author-results.type';
import { GetAuthorResultsType } from '../models/results/get-author-results.type';
import { AuthorService } from '../services/author.service';

@Resolver(AuthorQueryType)
export class AuthorQueryResolver extends AuthorRootResolver {
    constructor(private authorService: AuthorService) {
        super();
    }

    @ResolveField(() => GetAuthorResultsType)
    async getAuthor(@Args('id') id: string): Promise<GetAuthorResultsType> {
        return await this.authorService.getAuthor(id);
    }

    @ResolveField(() => GetListAuthorResultsType)
    async getAuthorList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAuthorResultsType> {
        return await this.authorService.getAuthorList(args);
    }

    @ResolveField(() => GetListAuthorResultsType)
    async getAuthorListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListAuthorResultsType> {
        return await this.authorService.getAuthorListByAnimeId(id, args);
    }
}
