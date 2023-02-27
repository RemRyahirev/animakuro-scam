import { Module } from '@nestjs/common';

import { UserFolderMutationResolver } from './resolvers/user-folder-mutation.resolver';
import { UserFolderService } from './services/user-folder.service';
import { UserFolderRootResolver } from './resolvers/user-folder-root.resolver';
import { UserFolderQueryResolver } from './resolvers/user-folder-query.resolver';

@Module({
    imports: [],
    providers: [
        UserFolderService,
        UserFolderRootResolver,
        UserFolderQueryResolver,
        UserFolderMutationResolver,
    ],
    exports: [],
})
export class UserFolderModule {}
