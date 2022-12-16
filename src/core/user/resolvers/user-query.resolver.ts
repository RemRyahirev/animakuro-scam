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
        const userList = await this.userService.getUserListByEmail(email, args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            userList: userList as any[],
            pagination,
        };
    }

    @FieldResolver(() => GetUserResultsType)
    async getUser(@Arg('id') id: string): Promise<GetUserResultsType> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return {
            success: true,
            user: user as any,
        };
    }

    @FieldResolver(() => GetListUserResultsType)
    async getUserList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserResultsType> {
        const userList = await this.userService.getUserList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            userList: userList as any[],
            pagination,
        };
    }
}
