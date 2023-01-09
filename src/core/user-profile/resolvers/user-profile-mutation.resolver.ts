import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserProfileInputType } from '../models/inputs/create-user-profile-input.type';
import {
    UserProfileMutationType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';
import { CreateUserProfileResultsType } from '../models/results/create-user-profile-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateUserProfileResultsType } from '../models/results/update-user-profile-results.type';
import { UpdateUserProfileInputType } from '../models/inputs/update-user-profile-input.type';
import { DeleteUserProfileResultsType } from '../models/results/delete-user-profile-results.type';
import { UserProfileService } from '../services/user-profile.service';

@Resolver(UserProfileMutationType)
export class UserProfileMutationResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => CreateUserProfileResultsType)
    async createUserProfile(
        @Args() args: CreateUserProfileInputType,
        @Context() ctx: ICustomContext
    ): Promise<CreateUserProfileResultsType> {
        return await this.userProfileService.createUserProfile(args, ctx);
    }

    @ResolveField(() => UpdateUserProfileResultsType)
    async updateUserProfile(
        @Args() args: UpdateUserProfileInputType,
        @Context() ctx: ICustomContext
    ): Promise<UpdateUserProfileResultsType> {
        return await this.userProfileService.updateUserProfile(args, ctx);
    }

    @ResolveField(() => DeleteUserProfileResultsType)
    async deleteUserProfile(
        @Args("id") id: string,
        @Context() ctx: ICustomContext
    ): Promise<DeleteUserProfileResultsType> {
        return await this.userProfileService.deleteUserProfile(id, ctx);
    }
}
