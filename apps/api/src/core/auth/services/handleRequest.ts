import { ThrottlerGuard } from '@nestjs/throttler';

export class HandleRequest extends ThrottlerGuard {
    _handleRequest(
        limit: number,
        ttl: number,
        req: Request,
        res: Response,
    ): Promise<boolean> {
        const context = {
            switchToHttp: () => ({
                getRequest: () => req,
                getResponse: () => res,
            }),
            getClass: () => ({ name: 'AuthService' }),
            getHandler: () => ({ name: 'Register' }),
        };
        // @ts-ignore
        return this.handleRequest(context, limit, ttl);
    }
}