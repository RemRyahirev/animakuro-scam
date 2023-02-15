import { Global, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { MailerModule } from './mailer/mailer.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './common/guards/throttle.guard';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            formatError,
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
            ttl: 30,
            limit: 10,
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
