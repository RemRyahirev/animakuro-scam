import { Injectable, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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
import fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql';
import { GenreRootResolver } from '../../core/genre/resolvers/genre-root.resolver';
import { GenreQueryResolver } from '../../core/genre/resolvers/genre-query.resolver';
import { GenreMutationResolver } from '../../core/genre/resolvers/genre-mutation.resolver';
import { StudioRootResolver } from "../../core/studio/resolvers/studio-root.resolver";
import { StudioQueryResolver } from "../../core/studio/resolvers/studio-query.resolver";
import { StudioMutationResolver } from "../../core/studio/resolvers/studio-mutation.resolver";

@Injectable()
export class SchemaService {
    public async generateSchema() {
        const app = await NestFactory.create(GraphQLSchemaBuilderModule);
        await app.init();
        const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
        const schema = await gqlSchemaFactory.create([
            AuthRootResolver,
            AuthQueryResolver,
            AuthMutationResolver,
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
        ]);
        fs.writeFile(
            path.resolve(__dirname + '../../../schema.gql'),
            printSchema(schema),
            {},
            (err: NodeJS.ErrnoException | null) => {
                Logger.log(`🚀 GraphQL schema generated`);
                if (err) console.log(err);
            },
        );
    }
}
