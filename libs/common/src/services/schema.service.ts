import fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql';

import { Injectable, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory,
} from '@nestjs/graphql';

import { AuthRootResolver } from '../../../../apps/api/src/core/auth/resolvers/auth-root.resolver';
import { AuthQueryResolver } from '../../../../apps/api/src/core/auth/resolvers/auth-query.resolver';
import { AuthMutationResolver } from '../../../../apps/api/src/core/auth/resolvers/auth-mutation.resolver';
import { UserRootResolver } from '../../../../apps/api/src/core/user/resolvers/user-root.resolver';
import { UserQueryResolver } from '../../../../apps/api/src/core/user/resolvers/user-query.resolver';
import { UserMutationResolver } from '../../../../apps/api/src/core/user/resolvers/user-mutation.resolver';
import { AnimeRootResolver } from '../../../../apps/api/src/core/anime/resolvers/anime-root.resolver';
import { AnimeQueryResolver } from '../../../../apps/api/src/core/anime/resolvers/anime-query.resolver';
import { AnimeMutationResolver } from '../../../../apps/api/src/core/anime/resolvers/anime-mutation.resolver';
import { AuthorRootResolver } from '../../../../apps/api/src/core/author/resolvers/author-root.resolver';
import { AuthorQueryResolver } from '../../../../apps/api/src/core/author/resolvers/author-query.resolver';
import { AuthorMutationResolver } from '../../../../apps/api/src/core/author/resolvers/author-mutation.resolver';
import { CharacterRootResolver } from '../../../../apps/api/src/core/character/resolvers/character-root.resolver';
import { CharacterQueryResolver } from '../../../../apps/api/src/core/character/resolvers/character-query.resolver';
import { CharacterMutationResolver } from '../../../../apps/api/src/core/character/resolvers/character-mutation.resolver';
import { GenreRootResolver } from '../../../../apps/api/src/core/genre/resolvers/genre-root.resolver';
import { GenreQueryResolver } from '../../../../apps/api/src/core/genre/resolvers/genre-query.resolver';
import { GenreMutationResolver } from '../../../../apps/api/src/core/genre/resolvers/genre-mutation.resolver';
import { StudioRootResolver } from '../../../../apps/api/src/core/studio/resolvers/studio-root.resolver';
import { StudioQueryResolver } from '../../../../apps/api/src/core/studio/resolvers/studio-query.resolver';
import { StudioMutationResolver } from '../../../../apps/api/src/core/studio/resolvers/studio-mutation.resolver';
import { TranslationRootResolver } from '../../../../apps/api/src/core/translation/resolvers/translation-root.resolver';
import { TranslationQueryResolver } from '../../../../apps/api/src/core/translation/resolvers/translation-query.resolver';
import { TranslationMutationResolver } from '../../../../apps/api/src/core/translation/resolvers/translation-mutation.resolver';
import { UserFolderRootResolver } from '../../../../apps/api/src/core/user-folder/resolvers/user-folder-root.resolver';
import { UserFolderQueryResolver } from '../../../../apps/api/src/core/user-folder/resolvers/user-folder-query.resolver';
import { UserFolderMutationResolver } from '../../../../apps/api/src/core/user-folder/resolvers/user-folder-mutation.resolver';
import { UserProfileRootResolver } from '../../../../apps/api/src/core/user-profile/resolvers/user-profile-root.resolver';
import { UserProfileQueryResolver } from '../../../../apps/api/src/core/user-profile/resolvers/user-profile-query.resolver';
import { UserProfileMutationResolver } from '../../../../apps/api/src/core/user-profile/resolvers/user-profile-mutation.resolver';
import { CatalogRootResolver } from '../../../../apps/api/src/core/catalog/resolvers/catalog-root.resolver';
import { CatalogQueryResolver } from '../../../../apps/api/src/core/catalog/resolvers/catalog-query.resolver';
import { AiringScheduleRootResolver } from '../../../../apps/api/src/core/airing-schedule/resolvers/airing-schedule-root.resolver';
import { AiringScheduleQueryResolver } from '../../../../apps/api/src/core/airing-schedule/resolvers/airing-schedule-query.resolver';
import { AiringScheduleMutationResolver } from '../../../../apps/api/src/core/airing-schedule/resolvers/airing-schedule-mutation.resolver';
import { AuthSessionRootResolver } from '../../../../apps/api/src/core/auth-session/resolvers/auth-session-root.resolver';
import { AuthSessionQueryResolver } from '../../../../apps/api/src/core/auth-session/resolvers/auth-session-query.resolver';
import { AuthSessionMutationResolver } from '../../../../apps/api/src/core/auth-session/resolvers/auth-session-mutation.resolver';

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
            path.join(
                __dirname.includes('dist')
                    ? __dirname.substring(0, __dirname.indexOf('dist/'))
                    : path.join(__dirname, '../../../..'),
                'schema.gql',
            ),
            printSchema(schema),
            {},
            (err: NodeJS.ErrnoException | null) => {
                Logger.log(`✅  GraphQL schema generated`);
                if (err) {
                    console.log('GraphQL generation failed');
                }
            },
        );
    }
}
