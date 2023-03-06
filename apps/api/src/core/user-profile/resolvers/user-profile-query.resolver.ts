import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationArgsType } from '@app/common/models/inputs';

import {
    GetAnimesGenresWithStatisticResultsType,
    GetListUserProfileResultsType,
    GetUserProfileResultsType,
} from '../models/results';
import { GetUserProfileArgsType } from '../models/inputs';
import { UserProfileService } from '../services/user-profile.service';

import {
    UserProfileQueryType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';
import { GetHistoryAnimeResultsType } from '../models/results/get-history-anime-results.type';
import { GetHistoryBaseArgsType } from '../models/inputs/get-history-base-args.type';
import { GetHistoryAuthorResultsType } from '../models/results/get-history-author-results.type';
import { GetHistoryCharacterResultsType } from '../models/results/get-history-character-results.type';
import { SortOrder } from '@app/common/models/enums/sort-order.enum';

@Resolver(UserProfileQueryType)
export class UserProfileQueryResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => GetUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserProfile(
        @Args() args: GetUserProfileArgsType,
        @AccessToken() user_id: string,
    ): Promise<GetUserProfileResultsType> {
        return await this.userProfileService.getUserProfile({
            user_id,
            ...args,
        });
    }

    @ResolveField(() => GetListUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserProfileList(
        @Args() args: PaginationArgsType,
    ): Promise<GetListUserProfileResultsType> {
        return await this.userProfileService.getUserProfileList(args);
    }

    @ResolveField(() => GetHistoryAnimeResultsType, {
        middleware: [AuthMiddleware]
    })
    async getHistoryAnime(
        @Args() args: GetHistoryBaseArgsType,
        @Args() pagination: PaginationArgsType,
        @AccessToken() user_id: string
    ): Promise<GetHistoryAnimeResultsType> {
        return await this.userProfileService.getHistoryAnime(args, pagination)
    }

    @ResolveField(() => GetHistoryAuthorResultsType, {
        middleware: [AuthMiddleware]
    })
    async getHistoryAuthor(
        @Args() args: GetHistoryBaseArgsType,
        @Args() pagination: PaginationArgsType,
        @AccessToken() user_id: string
    ): Promise<GetHistoryAuthorResultsType> {
        return await this.userProfileService.getHistoryAuthor(args, pagination)
    }

    @ResolveField(() => GetHistoryCharacterResultsType, {
        middleware: [AuthMiddleware]
    })
    async getHistoryCharacter(
        @Args() args: GetHistoryBaseArgsType,
        @Args() pagination: PaginationArgsType,
        @AccessToken() user_id: string
    ): Promise<GetHistoryCharacterResultsType> {
        return await this.userProfileService.getHistoryCharacter(args, pagination)
    }

    // @ResolveField(() => GetAnimesGenresWithStatisticResultsType, {
    //     middleware: [AuthMiddleware],
    // })
    // async getFavouriteGenresWithStatistic(
    //     @AccessToken() user_id: string,
    //     @Args('name') name: SortOrder,
    //     @Args('count') count: SortOrder,
    //     @Args('countIn') countIn: SortOrder,
    //     @Args('percent') percent: SortOrder,
    // ): Promise<GetAnimesGenresWithStatisticResultsType> {
    //     return await this.userProfileService.getGenresLikeFolders(
    //         user_id,
    //         name,
    //         count,
    //         countIn,
    //         percent,
    //     );
    // }
}
