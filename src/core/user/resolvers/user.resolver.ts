import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { hash } from 'common/utils/password.util';

import { ValidateSchemas } from 'common/decorators';
import { ICustomContext } from 'common/types/interfaces/custom-context.interface';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UpdateUserInputType } from "../inputs/update-user-input.type";
import { GqlHttpException } from '../../../common/errors/errors';
import { CreateUserInputType } from "../inputs/create-user-input.type";
import Database from '../../../database';
import Redis from '../../../loaders/redis';
import { Mailer } from '../../../common/utils/mailer';
import { HttpStatus } from '../../../common/types/enums/http-status.enum';
import { ValidateAll } from '../handlers/validate-all/validate-all';

@Resolver(() => User)
export class UserResolver {
    private readonly prisma = Database.getInstance().logic;
    private readonly redis = Redis.getInstance().logic;
    private readonly mailer = new Mailer();
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @Query(() => [User], { description: 'Get user list by email' })
    users(@Arg('email') email: string) {
        return this.prisma.user.findMany({ where: { email } });
    }

    @Query(() => User, { nullable: true, description: 'Get user by ID' })
    user(@Arg('id') id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    @ValidateSchemas()
    @Mutation(() => User, { description: 'Update user' })
    async modifyUser(@Args() args: UpdateUserInputType) {
        const user = await this.prisma.user.findUnique({ where: { id: args.id } });
        if (!user)
            throw new GqlHttpException('User not found', HttpStatus.NOT_FOUND);
        const validateAll = new ValidateAll(user as any, args, true);
        const result = await validateAll.run();
        Object.assign(user, result);
        // TODO: write data.avatar & data.banner handlers

        return await this.prisma.user.update({
            where: { id: user.id },
            data: { ...user },
        });
    }

    @Mutation(() => User, { description: 'Create user in database' })
    @Authorized()
    @ValidateSchemas()
    async createUser(
        @Args() args: CreateUserInputType,
        @Ctx() ctx: ICustomContext,
    ) {
        const { userJwtPayload } = ctx;
        if (!userJwtPayload) {
            throw new GqlHttpException(
                'not authorized',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!args.username)
            throw new GqlHttpException(
                'username is empty',
                HttpStatus.BAD_REQUEST,
            );

        if (!args.password)
            throw new GqlHttpException(
                'password is empty',
                HttpStatus.BAD_REQUEST,
            );

        const checkUsername = await this.userService.findUserByUsername(
            args.username,
        );

        if (checkUsername) {
            throw new GqlHttpException(
                'Username already used',
                HttpStatus.BAD_REQUEST,
            );
        }

        const savedUser = await this.userService.findUserById(
            userJwtPayload.uid,
        );

        if (!savedUser)
            throw new GqlHttpException(
                'There are no saved user by this email',
                HttpStatus.NOT_FOUND,
            );
        if (!savedUser.email)
            throw new GqlHttpException(
                'email is empty',
                HttpStatus.BAD_REQUEST,
            );

        const checkUsersCount = await this.userService.getUserEmailCount(
            savedUser.email,
        );

        if (checkUsersCount >= 5) {
            throw new GqlHttpException(
                'Too Many accounts',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashedPassword = await hash(args.password);

        return await this.userService.createUser({
            ...args,
            username: args.username,
            email: savedUser.email,
            password: hashedPassword,
        });
    }
}
