import { Module } from '@nestjs/common';
import { UserQueryResolver } from './resolvers/user-query.resolver';
import { UserService } from './services/user.service';
import { UserRootResolver } from './resolvers/user-root.resolver';
import { UserMutationResolver } from './resolvers/user-mutation.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [],
    providers: [
        UserService,
        UserRootResolver,
        UserQueryResolver,
        UserMutationResolver,
        JwtService,
    ],
    exports: [UserService],
})
export class UserModule {}
