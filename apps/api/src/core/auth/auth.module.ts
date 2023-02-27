import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthSessionModule } from '../auth-session/auth-session.module';
import { UserModule } from '../user/user.module';

import { AuthRootResolver } from './resolvers/auth-root.resolver';
import { AuthMutationResolver } from './resolvers/auth-mutation.resolver';
import { AuthQueryResolver } from './resolvers/auth-query.resolver';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { StrategyConfigService } from './services/strategy-config.service';
import {
    AppleStrategy,
    DiscordStrategy,
    FacebookStrategy,
    GoogleStrategy,
    JwtStrategy,
    TwitterStrategy,
} from './strategies';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        HttpModule,
        UserModule,
        AuthSessionModule,
        PassportModule,
        JwtModule.registerAsync({
            useClass: StrategyConfigService,
        }),
    ],
    providers: [
        AuthService,
        StrategyConfigService,
        TokenService,
        AuthRootResolver,
        AuthQueryResolver,
        AuthMutationResolver,
        AppleStrategy,
        DiscordStrategy,
        FacebookStrategy,
        GoogleStrategy,
        TwitterStrategy,
        JwtStrategy,
        LocalStrategy,
    ],
    exports: [AuthService, TokenService],
    controllers: [],
})
export class AuthModule {}
