import {
    CanActivate,
    ExecutionContext,
    mixin,
    Optional,
    Type,
    UnauthorizedException,
} from '@nestjs/common';
import { defaultOptions } from '@nestjs/passport/dist/options';
import { AuthModuleOptions, IAuthGuard } from '@nestjs/passport';
import { memoize } from '@nestjs/passport/dist/utils/memoize.util';
import { AuthenticateOptionsGoogle } from 'passport-google-oauth20';
import { AuthType } from '../models/enums';
import passport from 'passport';

export const CustomAuthGuard: (type?: string | string[]) => Type<IAuthGuard> =
    memoize(createAuthGuard);

function createAuthGuard(): Type<CanActivate> {
    class MixinAuthGuard<TUser = any> implements CanActivate {
        constructor(@Optional() protected readonly options: AuthModuleOptions) {
            this.options = this.options || {};
        }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const options = { ...defaultOptions, ...this.options };
            const [request, response] = [
                this.getRequest(context),
                this.getResponse(context),
            ];
            const passportFn = createPassportContext(request, response);
            const user = await passportFn(
                // changed
                request.body.auth_type || this.options.defaultStrategy,
                options,
                (err: any, user: any, info: any, status: any) =>
                    this.handleRequest(err, user, info, context, status),
            );
            request[options.property || defaultOptions.property] = user;
            return true;
        }

        getRequest<T = any>(context: ExecutionContext): T {
            return context.switchToHttp().getRequest();
        }

        getResponse<T = any>(context: ExecutionContext): T {
            return context.switchToHttp().getResponse();
        }

        async logIn<TRequest extends { logIn: Function } = any>(
            request: TRequest,
        ): Promise<void> {
            const user =
                // @ts-ignore
                request[this.options.property || defaultOptions.property];
            await new Promise<void>((resolve, reject) =>
                request.logIn(user, (err: any) =>
                    err ? reject(err) : resolve(),
                ),
            );
        }

        handleRequest(
            err: any,
            user: TUser,
            _info: any,
            _context: ExecutionContext,
            _status: any,
        ): TUser {
            if (err || !user) {
                throw err || new UnauthorizedException();
            }
            return user;
        }
    }

    return mixin(MixinAuthGuard);
}

const createPassportContext = (request: any, response: any) => {
    return (
        type: AuthType,
        options: AuthenticateOptionsGoogle,
        callback: Function,
    ) => {
        return new Promise<void>((resolve, reject) =>
            passport.authenticate(type, options, (err, user, info, status) => {
                try {
                    request.authInfo = info;
                    return resolve(callback(err, user, info, status));
                } catch (err) {
                    reject(err);
                }
            })(request, response, (err: any) =>
                err ? reject(err) : resolve(),
            ),
        );
    };
};
