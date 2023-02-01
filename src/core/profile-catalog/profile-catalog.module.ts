import { Module } from '@nestjs/common';
import { ProfileCatalogMutationResolver } from './resolvers/profile-catalog-mutation.resolver';
import { ProfileCatalogService } from './services/profile-catalog.service';
import { ProfileCatalogRootResolver } from './resolvers/profile-catalog-root.resolver';
import { ProfileCatalogQueryResolver } from './resolvers/profile-catalog-query.resolver';

@Module({
    imports: [],
    providers: [
        ProfileCatalogService,
        ProfileCatalogRootResolver,
        ProfileCatalogQueryResolver,
        ProfileCatalogMutationResolver,
    ],
    exports: [],
})
export class ProfileCatalogModule {}
