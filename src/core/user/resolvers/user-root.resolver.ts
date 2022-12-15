import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from '../models/user.model';
import Database from '../../../database';
import Redis from '../../../loaders/redis';
import { Mailer } from '../../../common/utils/mailer';
import { UserService } from '../services/user.service';

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
}

@Resolver()
export class UserRootResolver {
    protected readonly prisma = Database.getInstance().logic;
    protected readonly redis = Redis.getInstance().logic;
    protected readonly mailer = new Mailer();
    protected readonly userService: UserService = new UserService();

    @Mutation(() => UserMutationType, { description: 'User mutations' })
    userMutations() {
        return {};
    }

    @Query(() => UserQueryType, { description: 'User queries' })
    userQueries() {
        return {};
    }
}
