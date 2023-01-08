import { Args, Context, ResolveField, Resolver } from "@nestjs/graphql";
import { ValidateSchemas } from 'common/decorators';
import { ICustomContext } from 'common/models/interfaces/custom-context.interface';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { UserService } from "../services/user.service";

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ValidateSchemas()
    @ResolveField(() => UpdateUserResultsType)
    async updateUser(
        @Args() args: UpdateUserInputType,
    ): Promise<UpdateUserResultsType> {
        return await this.userService.updateUserInfo(args);
    }

    @ResolveField(() => CreateUserResultsType)
    @ValidateSchemas()
    async createUser(
        @Args() args: CreateUserInputType,
        @Context() ctx: ICustomContext,
    ): Promise<CreateUserResultsType> {
        return await this.userService.createUserInfo(args, ctx);
    }
}
