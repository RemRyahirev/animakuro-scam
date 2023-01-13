import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthRootResolver } from './resolvers/auth-root.resolver';
import { AuthMutationResolver } from './resolvers/auth-mutation.resolver';
import { AuthQueryResolver } from './resolvers/auth-query.resolver';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { StrategyConfigService } from './services/strategy-config.service';
import {
    AppleStrategy,
    DiscordStrategy,
    FacebookStrategy,
    GoogleStrategy,
    JwtStrategy,
} from './strategies';

@Module({
    imports: [
        UserModule,
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
        JwtStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
