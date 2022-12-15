import { decode, JwtPayload, sign, verify } from "jsonwebtoken";
import { ICustomContext } from "common/models/interfaces/custom-context.interface";
import { IJwtInputPayload } from "../../../common/models/interfaces";

// type ThirdPartyAuthRedisKey = `thirdparty-auth:${ThirdPartyAuthType}:${string}`
// type EmailAuthKey = `email-auth:${string}`

// type RedisTokenKeys =  ThirdPartyAuthRedisKey | EmailAuthKey

export default class JwtTokenService {
    // static getThirdPartyAuthRedisKey(type: ThirdPartyAuthType, uid: string) {
    //     return `thirdparty-auth:${type}:${uid}` as ThirdPartyAuthRedisKey
    // }

    // static getEmailAuthRedisKey(uid: string) {
    //     return `email-auth:${uid}` as EmailAuthKey
    // }

    constructor() {
        // const checkEnvs = [process.env.JWT_SECRET, process.env.JWT_ACCESS_TOKEN_EXPIRES_IN_SEC].some(
        //     (env) => env === undefined
        // )
        // if (checkEnvs) {
        //     throw new Error("JwtTokenService")
        // }
    }

    static ACCESS_TOKEN_COOKIE_NAME = 'animakuro-access-token';

    static verifyAccessToken(token: string) {
        return verify(token, process.env.JWT_SECRET!) as IJwtInputPayload &
            JwtPayload;
    }

    static setCookieAccessToken(ctx: ICustomContext, accessToken: string) {
        const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN_SEC;
        ctx.response.cookie(
            JwtTokenService.ACCESS_TOKEN_COOKIE_NAME,
            accessToken,
            {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 1000 * (expiresIn ? +expiresIn : 3600),
            },
        );
    }

    static removeCookieAccessToken(ctx: ICustomContext) {
        ctx.response.clearCookie(JwtTokenService.ACCESS_TOKEN_COOKIE_NAME);
    }

    static makeAccessToken(payload: IJwtInputPayload) {
        const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN_SEC || 3600;

        return sign(payload, process.env.JWT_SECRET || 'animekuro', {
            expiresIn,
            audience: 'content',
            issuer: 'auth',
        });
    }

    static decodeAccessToken(token: string) {
        const decoded = decode(token) as IJwtInputPayload & JwtPayload;

        return decoded;
    }

    // async saveJwtAccessToken(key: RedisTokenKeys, token: string) {
    //     await redis.set(key, token, { EX: +process.env.JWT_ACCESS_TOKEN_EXPIRES_IN_SEC })
    // }

    // async getJwtAccessToken(key: RedisTokenKeys) {
    //     return await redis.get(key);
    // }
}
