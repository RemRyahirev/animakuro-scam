import { Module } from '@nestjs/common';

import { AuthorService } from './services/author.service';
import { AuthorMutationResolver } from './resolvers/author-mutation.resolver';
import { AuthorRootResolver } from './resolvers/author-root.resolver';
import { AuthorQueryResolver } from './resolvers/author-query.resolver';

@Module({
    imports: [],
    providers: [
        AuthorService,
        AuthorRootResolver,
        AuthorQueryResolver,
        AuthorMutationResolver,
    ],
    exports: [],
})
export class AuthorModule {}
