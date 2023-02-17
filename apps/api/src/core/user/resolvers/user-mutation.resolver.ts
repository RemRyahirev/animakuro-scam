import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ValidateSchemas } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
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
        @Args() args: UpdateUserInputType,
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
        @Args() args: CreateUserInputType,
    ): Promise<CreateUserResultsType> {
        return await this.userService.createUser(args);
    }
}
