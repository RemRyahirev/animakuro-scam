import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthType } from '../models/enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthType.JWT) {
    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context);
        console.log(ctx.getContext().req.headers);
        return ctx.getContext().req;
    }
}
