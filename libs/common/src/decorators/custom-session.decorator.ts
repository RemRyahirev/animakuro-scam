import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CustomSession = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const context = GqlExecutionContext.create(ctx).getContext();
        const sessionID = context?.req?.sessionID;
        const sessionData = context?.req?.session;
        const session = {
            sessionID,
            ...sessionData,
        };
        return session ?? null;
    },
);
