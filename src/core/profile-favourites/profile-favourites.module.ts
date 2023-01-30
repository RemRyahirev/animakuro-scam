import { ProfileFavouritesService } from './services/profile-favourites.service';
import { Module } from '@nestjs/common';
import { ProfileFavouritesRootResolver } from './resolvers/profile-favourites-root.resolver';
import { ProfileFavouritesMutationResolver } from './resolvers/profile-favourites-mutation.resolver';
import { ProfileFavouritesQueryResolver } from './resolvers/profile-favourites-query.resolver';

@Module({
    imports: [],
    providers: [
        ProfileFavouritesService,
        ProfileFavouritesRootResolver,
        ProfileFavouritesQueryResolver,
        ProfileFavouritesMutationResolver,
    ],
    exports: [],
})
export class ProfileFavouritesModule {}
