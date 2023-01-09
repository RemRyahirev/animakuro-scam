import { Module } from '@nestjs/common';
import { UserProfileQueryResolver } from './resolvers/user-profile-query.resolver';
import { UserProfileService } from './services/user-profile.service';
import { UserProfileRootResolver } from './resolvers/user-profile-root.resolver';
import { UserProfileMutationResolver } from './resolvers/user-profile-mutation.resolver';

@Module({
    imports: [],
    providers: [
        UserProfileService,
        UserProfileRootResolver,
        UserProfileQueryResolver,
        UserProfileMutationResolver,
    ],
    exports: [],
})
export class UserProfileModule {}
