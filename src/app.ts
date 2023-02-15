import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './common/config/logger';
import { Logger, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { useContainer } from '@nestjs/class-validator';
import { graphqlUploadExpress } from 'graphql-upload';
import { CommonModule } from './common/common.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { SchemaService } from './common/services/schema.service';
import { PrismaService } from './common/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { exceptionFactory } from './common/utils/error-formatter.util';
import { getMaxFileSize } from 'common/config/cdn';

async function bootstrap(): Promise<void> {
    try {
        const app = await NestFactory.create(AppModule, {
            logger: new MyLogger(),
        });
        app.enableCors({
            credentials: true,
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: '*',
        });
        await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.REDIS,
            options: {
                host: process.env.REDIS_URL ?? 'localhost:6379',
            },
        });
        app.use(
            session({
                secret: 'test-secret',
                resave: false,
                saveUninitialized: true,
                cookie: {
                    secure: true,
                },
            }),
        );

        const globalPrefix = 'graphql';
        const configService = app.get(ConfigService);
        const schemaService = app.get(SchemaService);
        const prismaService = app.get(PrismaService);
        await schemaService.generateSchema();
        await prismaService.enableShutdownHooks(app);
        useContainer(app.select(CommonModule), {
            fallback: true,
            fallbackOnErrors: true,
        });
        app.setGlobalPrefix(globalPrefix, {
            exclude: [
                'oauth/google',
                'oauth/google/redirect',
                'oauth/apple',
                'oauth/discord',
                'oauth/discord/redirect',
                'oauth/apple/redirect',
                'oauth/facebook',
                'oauth/facebook/redirect',
                'oauth/apple',
                'oauth/apple/redirect',
                'oauth/twitter',
                'oauth/twitter/redirect',
            ],
        });
        app.use(graphqlUploadExpress({ maxFiles: 50, maxFileSize: getMaxFileSize() }))
        app.useGlobalFilters(new PrismaClientExceptionFilter());
        app.useGlobalFilters(new ValidationExceptionFilter());
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                exceptionFactory,
            }),
        );
        const port = configService.get('APP_PORT', 8080);
        await app.listen(port);
        Logger.log(
            `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
        );
    } catch (error) {
        Logger.error(
            `❌ Error starting server, ${error}`,
            '',
            'Bootstrap',
            false,
        );
        process.exit();
    }
}

bootstrap().catch((e) => {
    Logger.error(`❌ Error starting server, ${e}`, '', 'Bootstrap', false);
    throw e;
});
