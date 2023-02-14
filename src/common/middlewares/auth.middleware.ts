import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../services/prisma.service';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const AuthMiddleware: FieldMiddleware = async (
    ctx: MiddlewareContext,
    next: NextFn,
) => {
    if (!ctx.context.req.user_id) {
        const auth = ctx.context.req.headers.authentication;
        const prismaService = new PrismaService();
        const jwtService = new JwtService();

        console.log('token:', { auth });

        if (!!auth) {
            const token: any = await jwtService.decode(auth);

            console.log('token:', { auth, token });

            if (!!token && !ctx.context.req.user) {
                const user = await prismaService.user.findUnique({
                    where: { id: token.uuid },
                });
                if (!user?.is_email_confirmed) {
                    ctx.context.req.error =
                        'The email address is not confirmed!';
                    ctx.context.req.user_id = user?.id;
                } else if (user) {
                    ctx.context.req.user_id = user.id;
                }
            }
        } else {
            ctx.context.req.error = 'The token is missing!';
        }
    }
    return await next();
};
