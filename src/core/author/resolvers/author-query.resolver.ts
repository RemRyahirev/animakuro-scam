import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { AuthorQueryType, AuthorRootResolver } from './author-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListAuthorResultsType } from '../models/results/get-list-author-results.type';
import { GetAuthorResultsType } from '../models/results/get-author-results.type';

@Resolver(AuthorQueryType)
export class AuthorQueryResolver extends AuthorRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetAuthorResultsType)
    async getAuthor(@Arg('id') id: string): Promise<GetAuthorResultsType> {
        return await this.authorService.getAuthor(id);
    }

    @FieldResolver(() => GetListAuthorResultsType)
    async getAuthorList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAuthorResultsType> {
        return await this.authorService.getAuthorList(args);
    }

    @FieldResolver(() => GetListAuthorResultsType)
    async getAuthorListByAnimeId(
        @Arg('id') id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListAuthorResultsType> {
        return await this.authorService.getAuthorListByAnimeId(id, args);
    }
}
