import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthRootResolver } from './resolvers/auth-root.resolver';
import { AuthMutationResolver } from './resolvers/auth-mutation.resolver';
import { AuthQueryResolver } from './resolvers/auth-query.resolver';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { TokenService } from './services/token.service';
import { JwtConfigService } from './services/jwt-config.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
    ],
    providers: [
        AuthService,
        JwtConfigService,
        TokenService,
        AuthRootResolver,
        AuthQueryResolver,
        AuthMutationResolver,
        JwtStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
