import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthRootResolver } from './resolvers/auth-root.resolver';
import { AuthMutationResolver } from './resolvers/auth-mutation.resolver';
import { AuthQueryResolver } from './resolvers/auth-query.resolver';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './services/token.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        AuthService,
        TokenService,
        AuthRootResolver,
        AuthQueryResolver,
        AuthMutationResolver,
        JwtStrategy,
        LocalStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
