import { Config } from './loaders';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './common/config/logger';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
    PrismaExceptionInterceptor,
    ValidationExceptionInterceptor,
} from './common/interceptors';
import { PrismaService } from './common/services';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql";
import { printSchema } from "graphql";
import { AuthRootResolver } from "./core/auth/resolvers/auth-root.resolver";
import { UserRootResolver } from "./core/user/resolvers/user-root.resolver";
import { AuthQueryResolver } from "./core/auth/resolvers/auth-query.resolver";
import { AuthMutationResolver } from "./core/auth/resolvers/auth-mutation.resolver";
import { UserMutationResolver } from "./core/user/resolvers/user-mutation.resolver";
import { UserQueryResolver } from "./core/user/resolvers/user-query.resolver";
import fs from "fs";
import path from "path";
import session from "express-session";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { useContainer } from "@nestjs/class-validator";
import { CommonModule } from "./common/common.module";

async function bootstrap(): Promise<void> {
    try {
        const app = await NestFactory.create(AppModule, {
            cors: true,
            logger: new MyLogger(),
        });
        await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.REDIS,
            options: {
                host: 'localhost',
                port: 6379,
            },
        });
        app.use(session({
            secret: 'test-secret',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }))
        async function generateSchema() {
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
            ]);
            fs.writeFile(
                path.join(__dirname + '/schema.gql'),
                printSchema(schema),
                {},
                (err: NodeJS.ErrnoException | null) => {
                    Logger.log(
                        `🚀 GraphQL schema generated`,
                    );
                    if (err) console.log(err);
                },
            );
        }
        await generateSchema()
        const globalPrefix = 'graphql';
        const prismaService = app.get(PrismaService);
        await prismaService.enableShutdownHooks(app);
        useContainer(app.select(CommonModule), {
            fallback: true,
            fallbackOnErrors: true
        });
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalInterceptors(new PrismaExceptionInterceptor());
        app.useGlobalInterceptors(new ValidationExceptionInterceptor());
        app.useGlobalPipes(new ValidationPipe());
        const config = new Config().logic;
        const port = config.get('PORT', 8080);
        await app.listen(port);
        Logger.log(
            `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
        );
    } catch (error) {
        Logger.error(`❌ Error starting server, ${error}`, "", "Bootstrap", false);
        process.exit();
    }
}

bootstrap().catch((e) => {
    Logger.error(`❌ Error starting server, ${e}`, "", "Bootstrap", false);
    throw e;
});
