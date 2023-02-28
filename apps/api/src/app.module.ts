import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@nestjs-modules/ioredis';

import { formatError } from '@app/common/utils/error-formatter.util';
import { CacheModule } from '@app/common/cache/cache.module';
import { CommonModule } from '@app/common/common.module';
import { GqlThrottlerGuard } from '@app/common/guards/throttle.guard';

import { CoreModule } from './core/core.module';
import { MailerModule } from './mailer/mailer.module';

@Global()
@Module({
    imports: [
        CacheModule,
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                config: {
                    url: configService.get('REDIS_URL'),
                },
            }),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            // formatError,
            context: ({ req, res }) => ({ req, res }),
            driver: ApolloDriver,
            autoSchemaFile: true,
            fieldResolverEnhancers: ['guards', 'interceptors'],
            playground: {
                settings: {
                    'request.credentials': 'include',
                },
            },
            cors: {
                credentials: true,
                origin: true,
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                allowedHeaders: '*',
            },
        }),
        ThrottlerModule.forRoot({
            ttl: 10,
            limit: 100,
        }),
        CommonModule,
        CoreModule,
        MailerModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: GqlThrottlerGuard,
        },
    ],
    exports: [],
})
export class AppModule {}
