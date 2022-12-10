import { ResolverData } from 'type-graphql';
import { GqlHttpException, HttpStatus } from 'common/errors/errors';
import { ICustomContext } from 'common/types/custom-context.interface';
import JwtTokenService from '../services/jwt-token.service';
import { UserService } from 'core/user/services/user.service';

export class AuthCheckerMiddleware {
    private jwtTokenService: JwtTokenService;
    private userService: UserService;

    constructor() {
        this.jwtTokenService = new JwtTokenService();
        this.userService = new UserService();
    }

    private thirdPartyCheck = async (sessionId: string, uid: string) => {
        // const savedAccessToken = await this.jwtTokenService.getJwtAccessToken(
        //     JwtTokenService.getThirdPartyAuthRedisKey(type, uid)
        // );
        const savedSession = await this.userService.findUserSession(
            sessionId,
            uid,
        );

        if (!savedSession) {
            throw new GqlHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        // const savedAccessTokenPayload = JwtTokenService.decodeAccessToken(savedAccessToken);

        if (sessionId !== savedSession.id) {
            throw new GqlHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    };

    check = async (
        { root, args, context, info }: ResolverData<ICustomContext>,
        permissions: string[],
    ) => {
        const accessToken =
            context.request.cookies[JwtTokenService.ACCESS_TOKEN_COOKIE_NAME];

        if (!accessToken) {
            throw new GqlHttpException(
                'Unauthorized',
                HttpStatus.UNAUTHORIZED,
                'TOKEN_NOT_FOUND',
            );
        }

        // handle errors
        const accessTokenPayload =
            JwtTokenService.verifyAccessToken(accessToken);

        if (accessTokenPayload.thirdPartyAuth) {
            const { sessionId, uid } = accessTokenPayload;

            this.thirdPartyCheck(sessionId, uid);
        }

        context.userJwtPayload = accessTokenPayload;

        return true;
        // checks perrmision access for Mutations and Queries fields

        /*  EXAMPLE uncomment with exaple decorators in series resolvers and schemas

            const userPermissions = [
                'createSeries:name',
                'createSeries',
                'series:name',
            ]

            for (const allowed of permissions) {
                for (const current of userPermissions) {
                    if (allowed === current) {
                        return true
                    }
                }
            }

            otherwise -
            throw new GqlHttpException(`You don't have validators to access ${info.fieldName}`, HttpStatus.FORBIDDEN)
        */

        return true;
    };
}
