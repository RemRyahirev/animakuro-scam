import { Global, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './core/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { UserModule } from './core/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AnimeModule } from './core/anime/anime.module';
import { AuthorModule } from './core/author/author.module';
import { CharacterModule } from './core/character/character.module';
import { GenreModule } from './core/genre/genre.module';
import { StudioModule } from "./core/studio/studio.module";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 0,
        }),
        CommonModule,
        AuthModule,
        UserModule,
        AnimeModule,
        AuthorModule,
        CharacterModule,
        GenreModule,
        StudioModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
