import { Args, Authorized, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { hash } from 'common/utils/password.util';
import { ValidateSchemas } from 'common/decorators';
import { ICustomContext } from 'common/models/interfaces/custom-context.interface';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { GqlHttpException } from '../../../common/errors/errors';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { HttpStatus } from '../../../common/models/enums';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { UpdateUserResultsType } from "../models/results/update-user-results.type";
import { CreateUserResultsType } from "../models/results/create-user-results.type";

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor() {
        super();
    }

    @ValidateSchemas()
    @FieldResolver(() => UpdateUserResultsType)
    async updateUser(@Args() args: UpdateUserInputType): Promise<UpdateUserResultsType> {
        const user = await this.userService.updateUser(args);
        return {
            success: true,
            user: user as any,
        };
    }

    @FieldResolver(() => CreateUserResultsType)
    @Authorized()
    @ValidateSchemas()
    async createUser(
        @Args() args: CreateUserInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateUserResultsType> {
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
        const user = await this.userService.createUser({
            ...args,
            username: args.username,
            email: savedUser.email,
            password: hashedPassword,
        });
        return {
            success: true,
            user: user as any,
        };
    }
}
