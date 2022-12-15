import { Arg, FieldResolver, Resolver } from 'type-graphql';
import { User } from '../models/user.model';
import { UserQueryType, UserRootResolver } from './user-root.resolver';

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
}
