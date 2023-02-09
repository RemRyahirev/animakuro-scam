import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { AuthorModule } from './author/author.module';
import { CharacterModule } from './character/character.module';
import { GenreModule } from './genre/genre.module';
import { StudioModule } from './studio/studio.module';
import { TranslationModule } from './translation/translation.module';
import { UserFolderModule } from './user-folder/user-folder.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { CatalogModule } from './catalog/catalog.module';
import { AiringScheduleModule } from './airing-schedule/airing-schedule.module';
import { AuthSessionModule } from './auth-session/auth-session.module';
import { MicroserviceModule } from './microservice/microservice.module';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { UserCollectionModule } from './user-collection/user-collection.module';
import { OpeningEndingModule } from './opening-ending/opening-ending.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
    imports: [
        StatisticModule,
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
        UserFolderModule,
        UserProfileModule,
        CatalogModule,
        MicroserviceModule,
        ProfileSettingsModule,
        UserCollectionModule,
        OpeningEndingModule,
    ],
    exports: [
        StatisticModule,
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
        UserFolderModule,
        UserProfileModule,
        CatalogModule,
        MicroserviceModule,
        ProfileSettingsModule,
        UserCollectionModule,
        OpeningEndingModule,
    ],
})
export class CoreModule {}
