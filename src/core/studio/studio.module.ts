import { Module } from '@nestjs/common';
import { StudioMutationResolver } from './resolvers/studio-mutation.resolver';
import { StudioQueryResolver } from './resolvers/studio-query.resolver';
import { StudioRootResolver } from './resolvers/studio-root.resolver';
import { StudioService } from './services/studio.service';

@Module({
    imports: [],
    providers: [
        StudioService,
        StudioRootResolver,
        StudioQueryResolver,
        StudioMutationResolver,
    ],
    exports: [],
})
export class StudioModule {}
