import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { UserProfileQueryType, UserProfileRootResolver } from './user-profile-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserProfileResultsType } from '../models/results/get-list-user-profile-results.type';
import { GetUserProfileResultsType } from '../models/results/get-user-profile-results.type';

@Resolver(UserProfileQueryType)
export class UserProfileQueryResolver extends UserProfileRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetUserProfileResultsType)
    async getUserProfile(@Arg('id') id: string): Promise<GetUserProfileResultsType> {
        return await this.userProfileService.getUserProfile(id);
    }

    @FieldResolver(() => GetListUserProfileResultsType)
    async getUserProfileList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserProfileResultsType> {
        return await this.userProfileService.getUserProfileList(args);
    }
}
