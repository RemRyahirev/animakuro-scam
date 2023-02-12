import { Global, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { MailerModule } from './mailer/mailer.module';
import { GraphQLError } from './common/models/error/error'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
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
            formatError: (err) => {
                const error = new GraphQLError(err.message);
                return error.errorType();
            },
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 0,
        }),
        CommonModule,
        CoreModule,
        MailerModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule { }
