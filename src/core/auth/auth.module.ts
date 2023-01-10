import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthRootResolver } from './resolvers/auth-root.resolver';
import { AuthMutationResolver } from './resolvers/auth-mutation.resolver';
import { AuthQueryResolver } from './resolvers/auth-query.resolver';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONSTANTS } from '../../app.constants';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: APP_CONSTANTS.jwt_secret,
            signOptions: {
                expiresIn: '60s',
            },
        }),
    ],
    providers: [
        AuthService,
        AuthRootResolver,
        AuthQueryResolver,
        AuthMutationResolver,
        JwtStrategy,
        LocalStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
