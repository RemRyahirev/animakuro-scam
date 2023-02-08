import {
    BadRequestException,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthType } from '../models/enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthType.JWT) {
    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context);
        if (ctx.getContext().req.error)
            throw new BadRequestException({
                statusCode: 401,
                success: false,
                message: ctx.getContext().req.error,
            });
        return ctx.getContext().req;
    }
}
