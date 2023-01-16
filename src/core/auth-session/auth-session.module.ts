import { Module } from '@nestjs/common';
import { AuthSessionService } from './services/auth-session.service';
import { AuthSessionMutationResolver } from './resolvers/auth-session-mutation.resolver';
import { AuthSessionQueryResolver } from './resolvers/auth-session-query.resolver';
import { AuthSessionRootResolver } from './resolvers/auth-session-root.resolver';

@Module({
    imports: [],
    providers: [
        AuthSessionService,
        AuthSessionRootResolver,
        AuthSessionQueryResolver,
        AuthSessionMutationResolver,
    ],
    exports: [],
})
export class AuthSessionModule {}
