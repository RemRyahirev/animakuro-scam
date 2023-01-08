import { Module } from '@nestjs/common';
import { AnimeService } from './services/anime.service';
import { AnimeRootResolver } from './resolvers/anime-root.resolver';
import { AnimeQueryResolver } from './resolvers/anime-query.resolver';
import { AnimeMutationResolver } from './resolvers/anime-mutation.resolver';

@Module({
    imports: [],
    providers: [
        AnimeService,
        AnimeRootResolver,
        AnimeQueryResolver,
        AnimeMutationResolver,
    ],
    exports: [],
})
export class AnimeModule {}
