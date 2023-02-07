import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../services/prisma.service';

export const AccessToken = createParamDecorator(
    async (data: string, ctx: ExecutionContext) => {
        const context = GqlExecutionContext.create(ctx).getContext();
        const token: string = context.req?.headers?.authentication;

        const prisma = new PrismaService();
        const auth = await prisma.auth.findFirst({
            where: {
                access_token: token,
            },
        });
        if (!auth?.user_id) {
            return null;
        }
        return auth?.user_id ?? null;
    },
);
