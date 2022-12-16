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
        const author = await this.authorService.getAuthor(id);
        if (!author) {
            return {
                success: false,
                author: null,
                errors: ['Author not found'],
            };
        }
        return {
            success: true,
            author,
            errors: [],
        };
    }

    @FieldResolver(() => GetListAuthorResultsType)
    async getAuthorList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAuthorResultsType> {
        const authorList = await this.authorService.getAuthorList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            authorList,
            pagination,
        };
    }
}
