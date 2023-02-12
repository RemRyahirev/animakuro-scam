import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { GraphQLError } from "../models/error/error"


@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        if (req.error) {
            throw new Error(req.error);
        }
        return req;
    }
}
