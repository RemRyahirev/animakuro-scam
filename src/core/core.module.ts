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
import { AiringScheduleModule } from './airing-schedule/airing-schedule.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        AnimeModule,
        AuthorModule,
        CharacterModule,
        GenreModule,
        StudioModule,
        TranslationModule,
        UserAnimeModule,
        UserProfileModule,
        AiringScheduleModule,
    ],
    exports: [
        AuthModule,
        UserModule,
        AnimeModule,
        AuthorModule,
        CharacterModule,
        GenreModule,
        StudioModule,
        TranslationModule,
        UserAnimeModule,
        UserProfileModule,
        AiringScheduleModule,
    ],
})
export class CoreModule {}
