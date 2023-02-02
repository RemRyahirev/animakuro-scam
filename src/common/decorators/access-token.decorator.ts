import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AccessToken = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const context = GqlExecutionContext.create(ctx).getContext();
        const token = context.req?.headers?.authentication;
        return token ?? null;
    },
);
