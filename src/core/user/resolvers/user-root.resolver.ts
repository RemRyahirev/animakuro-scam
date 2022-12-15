import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from '../models/user.model';
import Database from '../../../database';
import Redis from '../../../loaders/redis';
import { Mailer } from '../../../common/utils/mailer';
import { UserService } from '../services/user.service';
import { PaginationService } from '../../../common/services';
import { PrismaClient } from '@prisma/client';
import { RedisClientType } from 'redis';
import { GetListUserResultsType } from '../models/results/get-list-user-results.type';

@ObjectType()
export class UserMutationType {
    @Field(() => User, { description: 'Create user' })
    createUser: User;

    @Field(() => User, { description: 'Update user' })
    modifyUser: User;
}

@ObjectType()
export class UserQueryType {
    @Field(() => User, { description: 'Get user by ID' })
    user: User;

    @Field(() => [User], {
        nullable: true,
        description: 'Get user list by email',
    })
    users: [User];

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
        return {};
    }
}
