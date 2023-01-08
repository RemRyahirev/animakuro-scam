import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { UserQueryType, UserRootResolver } from './user-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserResultsType } from '../models/results/get-list-user-results.type';
import { GetUserResultsType } from '../models/results/get-user-results.type';
import { GetListUserByEmailResultsType } from '../models/results/get-list-user-by-email-results.type';
import { UserService } from "../services/user.service";

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(
        private userService: UserService,
    ) {
        super();
    }

    @ResolveField(() => GetListUserByEmailResultsType)
    async getUsersByEmail(
        @Args('email') email: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListUserByEmailResultsType> {
        return await this.userService.getUsersByEmail(email, args);
    }

    @ResolveField(() => GetUserResultsType)
    async getUser(@Args('id') id: string): Promise<GetUserResultsType> {
        return await this.userService.getUser(id);
    }

    @ResolveField(() => GetListUserResultsType)
    async getUserList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserResultsType> {
        return await this.userService.getUserListInfo(args);
    }
}
