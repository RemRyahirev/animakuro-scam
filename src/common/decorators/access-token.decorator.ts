import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../services/prisma.service';

export const AccessToken = createParamDecorator(
    async (data: string, ctx: ExecutionContext) => {
        const context = GqlExecutionContext.create(ctx).getContext();
        const token: string = context.req?.headers?.authentication;

        const jwtService = new JwtService();
        const prisma = new PrismaService();
        const decoded = jwtService.decode(token);

        if (decoded == null || typeof decoded == 'string') {
            return null;
        }

        if (!decoded.user_id) {
            return null;
        }
        const user = prisma.user.findUnique({
            where: { id: decoded.user_id },
        });
        if (!user) {
            return null;
        }
        return decoded.user_id ?? null;
    },
);
