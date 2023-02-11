import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
// import { GraphQLError } from "../models/error/error"


@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        if (req.error) {
            // throw new BadRequestException({
            //     statusCode: '401',
            //     success: false,
            //     message: req.error,
            // });
            throw new GraphQLError(req.error, {
                extensions: {
                    exception: {
                        code: 401,
                        stacktrace: "test"
                    },
                },
            })
        }
        return req;
    }
}
