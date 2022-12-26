import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { CreateUserProfileInputType } from '../models/inputs/create-user-profile-input.type';
import { UserProfileMutationType, UserProfileRootResolver } from './user-profile-root.resolver';
import { CreateUserProfileResultsType } from '../models/results/create-user-profile-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateUserProfileResultsType } from '../models/results/update-user-profile-results.type';
import { UpdateUserProfileInputType } from '../models/inputs/update-user-profile-input.type';
import { DeleteUserProfileResultsType } from '../models/results/delete-user-profile-results.type';

@Resolver(UserProfileMutationType)
export class UserProfileMutationResolver extends UserProfileRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateUserProfileResultsType)
    async createUserProfile(
        @Args() args: CreateUserProfileInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateUserProfileResultsType> {
        return await this.userProfileService.createUserProfile(args, ctx);
    }

    @FieldResolver(() => UpdateUserProfileResultsType)
    async updateUserProfile(
        @Args() args: UpdateUserProfileInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateUserProfileResultsType> {
        return await this.userProfileService.updateUserProfile(args, ctx);
    }

    @FieldResolver(() => DeleteUserProfileResultsType)
    async deleteUserProfile(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteUserProfileResultsType> {
        return await this.userProfileService.deleteUserProfile(id, ctx);
    }
}
