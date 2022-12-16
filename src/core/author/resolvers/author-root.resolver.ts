import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Database from '../../../database';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';
import { AuthorService } from '../services/author.service';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { GetListAuthorResultsType } from '../models/results/get-list-author-results.type';
import { GetAuthorResultsType } from '../models/results/get-author-results.type';
import { PaginationService } from "../../../common/services";
import { PrismaClient } from '@prisma/client';

@ObjectType()
export class AuthorMutationType {
    @Field(() => CreateAuthorResultsType, { description: 'Create author' })
    createAuthor: CreateAuthorResultsType;

    @Field(() => UpdateAuthorResultsType, { description: 'Update author' })
    updateAuthor: UpdateAuthorResultsType;

    @Field(() => DeleteAuthorResultsType, { description: 'Delete author' })
    deleteAuthor: DeleteAuthorResultsType;
}

@ObjectType()
export class AuthorQueryType {
    @Field(() => GetAuthorResultsType, { description: 'Get author by ID' })
    getAuthor: GetAuthorResultsType;

    @Field(() => GetListAuthorResultsType, { description: 'Get author list' })
    getAuthorList: GetListAuthorResultsType;
}

@Resolver()
export class AuthorRootResolver {
    protected readonly prisma: PrismaClient = Database.getInstance().logic;
    protected readonly authorService: AuthorService = new AuthorService();
    protected readonly paginationService: PaginationService =
        new PaginationService('author');

    @Mutation(() => AuthorMutationType, { description: 'Author mutations' })
    authorMutations() {
        return {};
    }

    @Query(() => AuthorQueryType, { description: 'Author queries' })
    authorQueries() {
        return {};
    }
}
