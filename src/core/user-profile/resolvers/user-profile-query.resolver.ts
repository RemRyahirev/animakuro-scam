import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    UserProfileQueryType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserProfileResultsType } from '../models/results/get-list-user-profile-results.type';
import { GetUserProfileResultsType } from '../models/results/get-user-profile-results.type';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { UserProfileService } from '../services/user-profile.service';

@Resolver(UserProfileQueryType)
export class UserProfileQueryResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => GetUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserProfile(
        @Args('id') id: string,
    ): Promise<GetUserProfileResultsType> {
        return await this.userProfileService.getUserProfile(id);
    }

    @ResolveField(() => GetListUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserProfileList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserProfileResultsType> {
        return await this.userProfileService.getUserProfileList(args);
    }
}
