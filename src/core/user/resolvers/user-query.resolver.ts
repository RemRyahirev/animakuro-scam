import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { User } from '../models/user.model';
import { UserQueryType, UserRootResolver } from './user-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserResultsType } from '../models/results/get-list-user-results.type';

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => [User])
    users(@Arg('email') email: string) {
        return this.prisma.user.findMany({ where: { email } });
    }

    @FieldResolver(() => User)
    user(@Arg('id') id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    @FieldResolver(() => GetListUserResultsType)
    async getUserList(
        @Args() args: PaginationInputType,
    ) {
        const userList = await this.userService.getUserList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            userList,
            pagination,
        };
    }
}
