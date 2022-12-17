import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { UserQueryType, UserRootResolver } from './user-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserResultsType } from '../models/results/get-list-user-results.type';
import { GetUserResultsType } from '../models/results/get-user-results.type';
import { GetListUserByEmailResultsType } from '../models/results/get-list-user-by-email-results.type';

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetListUserByEmailResultsType)
    async getUsersByEmail(
        @Arg('email') email: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListUserByEmailResultsType> {
        return await this.userService.getUsersByEmail(email, args);
    }

    @FieldResolver(() => GetUserResultsType)
    async getUser(@Arg('id') id: string): Promise<GetUserResultsType> {
        return await this.userService.getUser(id);
    }

    @FieldResolver(() => GetListUserResultsType)
    async getUserList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserResultsType> {
        return await this.userService.getUserListInfo(args);
    }
}
