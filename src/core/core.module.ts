import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { AuthorModule } from './author/author.module';
import { CharacterModule } from './character/character.module';
import { GenreModule } from './genre/genre.module';
import { StudioModule } from './studio/studio.module';
import { TranslationModule } from './translation/translation.module';
import { UserAnimeModule } from './user-anime/user-anime.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { CatalogModule } from './catalog/catalog.module';
import { AiringScheduleModule } from './airing-schedule/airing-schedule.module';
import { AuthSessionModule } from './auth-session/auth-session.module';
import { MicroserviceModule } from './microservice/microservice.module';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { ProfileFavouritesModule } from './profile-favourites/profile-favourites.module';

@Module({
    imports: [
        AuthModule,
        AuthSessionModule,
        AiringScheduleModule,
        AnimeModule,
        AuthorModule,
        CharacterModule,
        GenreModule,
        StudioModule,
        TranslationModule,
        UserModule,
        UserAnimeModule,
        UserProfileModule,
        CatalogModule,
        MicroserviceModule,
        ProfileSettingsModule,
        ProfileFavouritesModule,
    ],
    exports: [
        AuthModule,
        AuthSessionModule,
        AiringScheduleModule,
        AnimeModule,
        AuthorModule,
        CharacterModule,
        GenreModule,
        StudioModule,
        TranslationModule,
        UserModule,
        UserAnimeModule,
        UserProfileModule,
        CatalogModule,
        MicroserviceModule,
        ProfileSettingsModule,
        ProfileFavouritesModule,
    ],
})
export class CoreModule {}
