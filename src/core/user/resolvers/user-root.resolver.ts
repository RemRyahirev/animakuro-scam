import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Database from '../../../database';
import Redis from '../../../loaders/redis';
import { Mailer } from '../../../common/utils/mailer';
import { UserService } from '../services/user.service';
import { PaginationService } from '../../../common/services';
import { PrismaClient } from '@prisma/client';
import { RedisClientType } from 'redis';
import { GetListUserResultsType } from '../models/results/get-list-user-results.type';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { GetUserResultsType } from '../models/results/get-user-results.type';
import { GetListUserByEmailResultsType } from '../models/results/get-list-user-by-email-results.type';

@ObjectType()
export class UserMutationType {
    @Field(() => CreateUserResultsType, { description: 'Create user' })
    createUser: CreateUserResultsType;

    @Field(() => UpdateUserResultsType, { description: 'Update user' })
    updateUser: UpdateUserResultsType;
}

@ObjectType()
export class UserQueryType {
    @Field(() => GetUserResultsType, { description: 'Get user by ID' })
    getUser: GetUserResultsType;

    @Field(() => GetListUserByEmailResultsType, {
        nullable: true,
        description: 'Get user list by email',
    })
    getUsersByEmail: GetListUserByEmailResultsType;

    @Field(() => GetListUserResultsType, { description: 'Get user list' })
    getUserList: GetListUserResultsType;
}

@Resolver()
export class UserRootResolver {
    protected readonly prisma: PrismaClient = Database.getInstance().logic;
    protected readonly redis: RedisClientType = Redis.getInstance().logic;
    protected readonly mailer: Mailer = new Mailer();
    protected readonly userService: UserService = new UserService();
    protected readonly paginationService: PaginationService =
        new PaginationService('user');

    @Mutation(() => UserMutationType, { description: 'User mutations' })
    userMutations() {
        return {};
    }

    @Query(() => UserQueryType, { description: 'User queries' })
    userQueries() {
        console.log(123);
        return {};
    }
}
