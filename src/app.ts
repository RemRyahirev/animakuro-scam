import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './common/config/logger';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
    PrismaExceptionInterceptor,
    ValidationExceptionInterceptor,
} from './common/interceptors';
import { PrismaService, SchemaService } from './common/services';
import session from 'express-session';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { useContainer } from '@nestjs/class-validator';
import { CommonModule } from './common/common.module';

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
        const schemaService = app.get(SchemaService);
        await schemaService.generateSchema();
        const prismaService = app.get(PrismaService);
        await prismaService.enableShutdownHooks(app);
        useContainer(app.select(CommonModule), {
            fallback: true,
            fallbackOnErrors: true,
        });
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalInterceptors(new PrismaExceptionInterceptor());
        app.useGlobalInterceptors(new ValidationExceptionInterceptor());
        app.useGlobalPipes(new ValidationPipe());
        const port = 8080;
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
