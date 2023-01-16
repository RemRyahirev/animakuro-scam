import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { CustomAuthGuard } from './custom-auth.guard';

@Injectable()
export class SocialAuthGuard extends CustomAuthGuard() {
    getRequest(context: GqlExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const args = ctx.getArgs();
        req.body = {
            ...req.body,
            access_token: args.access_token,
            auth_type: args.auth_type,
        };
        return req;
    }
}
