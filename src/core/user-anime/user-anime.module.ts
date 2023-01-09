import { Module } from '@nestjs/common';
import { UserAnimeMutationResolver } from './resolvers/user-anime-mutation.resolver';
import { UserAnimeService } from './services/user-anime.service';
import { UserAnimeRootResolver } from './resolvers/user-anime-root.resolver';
import { UserAnimeQueryResolver } from './resolvers/user-anime-query.resolver';

@Module({
    imports: [],
    providers: [
        UserAnimeService,
        UserAnimeRootResolver,
        UserAnimeQueryResolver,
        UserAnimeMutationResolver,
    ],
    exports: [],
})
export class UserAnimeModule {}
