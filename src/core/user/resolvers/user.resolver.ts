import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { hash } from 'common/utils/password.util';

import { ValidateSchemas } from 'common/decorators/validation';
import { ICustomContext } from 'common/types/interfaces/custom-context.interface';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UpdateUserInput } from '../inputs/update-user.schema';
import { GqlHttpException } from '../../../common/errors/errors';
import { CreateUserInput } from '../inputs/create-user.schema';
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

    @Query(() => [User])
    users(@Arg('email') email: string) {
        return this.prisma.user.findMany({ where: { email } });
    }

    @Query(() => User, { nullable: true })
    user(@Arg('id') id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    @ValidateSchemas()
    @Mutation(() => User)
    async modifyUser(
        @Arg('id') id: string,
        @Arg('data') data: UpdateUserInput,
    ) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new GqlHttpException('User not found', HttpStatus.NOT_FOUND);
        const validateAll = new ValidateAll(user as any, data, true);
        const result = await validateAll.run();
        Object.assign(user, result);
        // TODO: write data.avatar & data.banner handlers

        return await this.prisma.user.update({
            where: { id: user.id },
            data: { ...user },
        });
    }

    @Mutation(() => User)
    @Authorized()
    @ValidateSchemas()
    async createUser(
        @Arg('data', () => CreateUserInput) data: CreateUserInput,
        @Ctx() ctx: ICustomContext,
    ) {
        const { userJwtPayload } = ctx;
        if (!userJwtPayload) {
            throw new GqlHttpException(
                'not authorized',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!data.username)
            throw new GqlHttpException(
                'username is empty',
                HttpStatus.BAD_REQUEST,
            );

        if (!data.password)
            throw new GqlHttpException(
                'password is empty',
                HttpStatus.BAD_REQUEST,
            );

        const checkUsername = await this.userService.findUserByUsername(
            data.username,
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

        const hashedPassword = await hash(data.password);

        return await this.userService.createUser({
            ...data,
            username: data.username,
            email: savedUser.email,
            password: hashedPassword,
        });
    }
}
