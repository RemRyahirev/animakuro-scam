import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { ValidateSchemas } from 'common/decorators';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { UserService } from '../services/user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ValidateSchemas()
    @ResolveField(() => UpdateUserResultsType)
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Args() args: UpdateUserInputType,
    ): Promise<UpdateUserResultsType> {
        return await this.userService.updateUser(args);
    }

    @ResolveField(() => CreateUserResultsType)
    @ValidateSchemas()
    @UseGuards(JwtAuthGuard)
    async createUser(
        @Args() args: CreateUserInputType,
    ): Promise<CreateUserResultsType> {
        return await this.userService.createUser(args);
    }
}
