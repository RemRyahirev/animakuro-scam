import { Injectable, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql';
import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { AuthRootResolver } from '../../core/auth/resolvers/auth-root.resolver';
import { AuthQueryResolver } from '../../core/auth/resolvers/auth-query.resolver';
import { AuthMutationResolver } from '../../core/auth/resolvers/auth-mutation.resolver';
import { UserRootResolver } from '../../core/user/resolvers/user-root.resolver';
import { UserQueryResolver } from '../../core/user/resolvers/user-query.resolver';
import { UserMutationResolver } from '../../core/user/resolvers/user-mutation.resolver';
import { AnimeRootResolver } from '../../core/anime/resolvers/anime-root.resolver';
import { AnimeQueryResolver } from '../../core/anime/resolvers/anime-query.resolver';
import { AnimeMutationResolver } from '../../core/anime/resolvers/anime-mutation.resolver';
import { AuthorRootResolver } from '../../core/author/resolvers/author-root.resolver';
import { AuthorQueryResolver } from '../../core/author/resolvers/author-query.resolver';
import { AuthorMutationResolver } from '../../core/author/resolvers/author-mutation.resolver';
import { CharacterRootResolver } from '../../core/character/resolvers/character-root.resolver';
import { CharacterQueryResolver } from '../../core/character/resolvers/character-query.resolver';
import { CharacterMutationResolver } from '../../core/character/resolvers/character-mutation.resolver';
import { GenreRootResolver } from '../../core/genre/resolvers/genre-root.resolver';
import { GenreQueryResolver } from '../../core/genre/resolvers/genre-query.resolver';
import { GenreMutationResolver } from '../../core/genre/resolvers/genre-mutation.resolver';
import { StudioRootResolver } from '../../core/studio/resolvers/studio-root.resolver';
import { StudioQueryResolver } from '../../core/studio/resolvers/studio-query.resolver';
import { StudioMutationResolver } from '../../core/studio/resolvers/studio-mutation.resolver';
import { TranslationRootResolver } from '../../core/translation/resolvers/translation-root.resolver';
import { TranslationQueryResolver } from '../../core/translation/resolvers/translation-query.resolver';
import { TranslationMutationResolver } from '../../core/translation/resolvers/translation-mutation.resolver';
import { UserFolderRootResolver } from '../../core/user-folder/resolvers/user-folder-root.resolver';
import { UserFolderQueryResolver } from '../../core/user-folder/resolvers/user-folder-query.resolver';
import { UserFolderMutationResolver } from '../../core/user-folder/resolvers/user-folder-mutation.resolver';
import { UserProfileRootResolver } from '../../core/user-profile/resolvers/user-profile-root.resolver';
import { UserProfileQueryResolver } from '../../core/user-profile/resolvers/user-profile-query.resolver';
import { UserProfileMutationResolver } from '../../core/user-profile/resolvers/user-profile-mutation.resolver';
import { CatalogRootResolver } from '../../core/catalog/resolvers/catalog-root.resolver';
import { CatalogQueryResolver } from '../../core/catalog/resolvers/catalog-query.resolver';
import { AiringScheduleRootResolver } from '../../core/airing-schedule/resolvers/airing-schedule-root.resolver';
import { AiringScheduleQueryResolver } from '../../core/airing-schedule/resolvers/airing-schedule-query.resolver';
import { AiringScheduleMutationResolver } from '../../core/airing-schedule/resolvers/airing-schedule-mutation.resolver';
import { AuthSessionRootResolver } from '../../core/auth-session/resolvers/auth-session-root.resolver';
import { AuthSessionQueryResolver } from '../../core/auth-session/resolvers/auth-session-query.resolver';
import { AuthSessionMutationResolver } from '../../core/auth-session/resolvers/auth-session-mutation.resolver';

@Injectable()
export class SchemaService {
    public async generateSchema(): Promise<void> {
        const app = await NestFactory.create(GraphQLSchemaBuilderModule);
        await app.init();
        const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
        const schema = await gqlSchemaFactory.create([
            AuthRootResolver,
            AuthQueryResolver,
            AuthMutationResolver,
            AuthSessionRootResolver,
            AuthSessionQueryResolver,
            AuthSessionMutationResolver,
            UserRootResolver,
            UserQueryResolver,
            UserMutationResolver,
            AnimeRootResolver,
            AnimeQueryResolver,
            AnimeMutationResolver,
            AuthorRootResolver,
            AuthorQueryResolver,
            AuthorMutationResolver,
            CharacterRootResolver,
            CharacterQueryResolver,
            CharacterMutationResolver,
            GenreRootResolver,
            GenreQueryResolver,
            GenreMutationResolver,
            StudioRootResolver,
            StudioQueryResolver,
            StudioMutationResolver,
            TranslationRootResolver,
            TranslationQueryResolver,
            TranslationMutationResolver,
            UserFolderRootResolver,
            UserFolderQueryResolver,
            UserFolderMutationResolver,
            UserProfileRootResolver,
            UserProfileQueryResolver,
            UserProfileMutationResolver,
            CatalogRootResolver,
            CatalogQueryResolver,
            AiringScheduleRootResolver,
            AiringScheduleQueryResolver,
            AiringScheduleMutationResolver,
        ]);
        fs.writeFile(
            path.resolve(__dirname + '../../../../schema.gql'),
            printSchema(schema),
            {},
            (err: NodeJS.ErrnoException | null) => {
                Logger.log(`✅  GraphQL schema generated`);
                if (err) console.log(err);
            },
        );
    }
}
