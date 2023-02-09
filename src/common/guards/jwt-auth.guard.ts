import {
    BadRequestException,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
@Injectable()
export class JwtAuthGuard {
    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        if (req.error)
            throw new BadRequestException({
                statusCode: 401,
                success: false,
                message: req.error,
            });
        return req;
    }
}
