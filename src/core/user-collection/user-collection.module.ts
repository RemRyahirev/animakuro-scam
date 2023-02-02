import { Module } from '@nestjs/common';
import { UserCollectionMutationResolver } from './resolvers/user-collection-mutation.resolver';
import { UserCollectionService } from './services/user-collection.service';
import { UserCollectionRootResolver } from './resolvers/user-collection-root.resolver';
import { UserCollectionQueryResolver } from './resolvers/user-collection-query.resolver';

@Module({
    imports: [],
    providers: [
        UserCollectionService,
        UserCollectionRootResolver,
        UserCollectionQueryResolver,
        UserCollectionMutationResolver,
    ],
    exports: [],
})
export class UserCollectionModule {}
