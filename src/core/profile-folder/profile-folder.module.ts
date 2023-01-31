import { Module } from '@nestjs/common';
import { ProfileFolderMutationResolver } from './resolvers/profile-folder-mutation.resolver';
import { ProfileFolderService } from './services/profile-folder.service';
import { ProfileFolderRootResolver } from './resolvers/profile-folder-root.resolver';
import { ProfileFolderQueryResolver } from './resolvers/profile-folder-query.resolver';

@Module({
    imports: [],
    providers: [
        ProfileFolderService,
        ProfileFolderRootResolver,
        ProfileFolderQueryResolver,
        ProfileFolderMutationResolver,
    ],
    exports: [],
})
export class ProfileFolderModule {}
