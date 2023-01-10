import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LoginInputType } from '../../core/auth/models/inputs/login-input.type';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    getRequest(context: ExecutionContext) {
        const ctx: GqlExecutionContext = GqlExecutionContext.create(
            <ExecutionContext>context,
        );
        const request = ctx.getContext();
        request.body = ctx.getArgs<LoginInputType>();
        return request;
    }
}
