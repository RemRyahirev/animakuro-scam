import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ProfileId = createParamDecorator(
    async (data: string, ctx: ExecutionContext) => {
        const context = GqlExecutionContext.create(ctx).getContext();
        const user_id: string = context.req?.profile_id;
        return user_id ?? null;
    },
);
