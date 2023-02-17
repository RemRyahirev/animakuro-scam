import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AccessToken = createParamDecorator(
    async (data: string, ctx: ExecutionContext) => {
        const context = GqlExecutionContext.create(ctx).getContext();
        const user_id: string = context.req?.user_id;
        return user_id ?? null;
    },
);
