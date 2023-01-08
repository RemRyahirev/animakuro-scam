import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthRootResolver } from './resolvers/auth-root.resolver';
import { AuthMutationResolver } from './resolvers/auth-mutation.resolver';
import { AuthQueryResolver } from './resolvers/auth-query.resolver';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { MailerModule } from '../../mailer/mailer.module';

@Module({
    imports: [
        MailerModule,
        UserModule,
        PassportModule,
        // JwtModule.register({
        //   secret: jwtConstants.secret,
        //   signOptions: {
        //     expiresIn: '60s',
        //   },
        // }),
    ],
    providers: [
        AuthService,
        AuthRootResolver,
        AuthQueryResolver,
        AuthMutationResolver,
    ],
    exports: [AuthService],
})
export class AuthModule {}
