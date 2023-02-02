import { Module } from '@nestjs/common';
import { UserCatalogMutationResolver } from './resolvers/user-catalog-mutation.resolver';
import { UserCatalogService } from './services/user-catalog.service';
import { UserCatalogRootResolver } from './resolvers/user-catalog-root.resolver';
import { UserCatalogQueryResolver } from './resolvers/user-catalog-query.resolver';

@Module({
    imports: [],
    providers: [
        UserCatalogService,
        UserCatalogRootResolver,
        UserCatalogQueryResolver,
        UserCatalogMutationResolver,
    ],
    exports: [],
})
export class UserCatalogModule {}
