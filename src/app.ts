import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './common/config/logger';
import { Logger, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { useContainer } from '@nestjs/class-validator';
import { CommonModule } from './common/common.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { SchemaService } from './common/services/schema.service';
import { PrismaService } from './common/services/prisma.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
    try {
        const app = await NestFactory.create(AppModule, {
            logger: new MyLogger(),
            cors: true,
        });
        await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.REDIS,
            options: {
                host: 'localhost',
                port: 6379,
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
                'oauth/apple/redirect',
                'oauth/facebook',
                'oauth/facebook/redirect',
                'oauth/apple',
                'oauth/apple/redirect'
            ]
        });
        app.useGlobalFilters(new PrismaClientExceptionFilter());
        app.useGlobalFilters(new ValidationExceptionFilter());
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
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
    Logger.error(`❌ Error starting server, ${e}`, "", "Bootstrap", false);
    throw e;
});
