import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ValidateSchemas } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { UpdateUserArgsType } from '../models/inputs/update-user-args.type';
import { CreateUserArgsType } from '../models/inputs/create-user-args.type';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { UserService } from '../services/user.service';

import { UserMutationType, UserRootResolver } from './user-root.resolver';

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField(() => UpdateUserResultsType, {
        middleware: [AuthMiddleware],
    })
    @ValidateSchemas()
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Args() args: UpdateUserArgsType,
        @AccessToken() user_id: string,
    ): Promise<UpdateUserResultsType> {
        return await this.userService.updateUser({
            ...args,
            id: args.id ?? user_id,
        });
    }

    @ResolveField(() => CreateUserResultsType, {
        middleware: [AuthMiddleware],
    })
    @ValidateSchemas()
    @UseGuards(JwtAuthGuard)
    async createUser(
        @Args() args: CreateUserArgsType,
    ): Promise<CreateUserResultsType> {
        return await this.userService.createUser(args);
    }
}
