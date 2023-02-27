import { Module } from '@nestjs/common';

import { GenreMutationResolver } from './resolvers/genre-mutation.resolver';
import { GenreQueryResolver } from './resolvers/genre-query.resolver';
import { GenreService } from './services/genre.service';
import { GenreRootResolver } from './resolvers/genre-root.resolver';

@Module({
    imports: [],
    providers: [
        GenreService,
        GenreRootResolver,
        GenreQueryResolver,
        GenreMutationResolver,
    ],
    exports: [],
})
export class GenreModule {}
