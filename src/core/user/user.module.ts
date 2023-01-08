import { Module } from "@nestjs/common";
import { UserQueryResolver } from "./resolvers/user-query.resolver";
import { UserService } from "./services/user.service";
import { UserRootResolver } from "./resolvers/user-root.resolver";
import { UserMutationResolver } from "./resolvers/user-mutation.resolver";

@Module({
    imports: [],
    providers: [
        UserService,
        UserRootResolver,
        UserQueryResolver,
        UserMutationResolver,
    ],
    exports: [UserService],
})
export class UserModule {}
