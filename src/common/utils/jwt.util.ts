import * as jwt from 'jsonwebtoken';
import { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'animekuro';
/**
 * @deprecated use JwtService instead
 */
const signJWT = (options: SignOptions): Promise<string> =>
    new Promise((resolve, reject) =>
        jwt.sign({}, JWT_SECRET, options, (error, value) =>
            error ? reject(error) : resolve(value || 'animekuro'),
        ),
    );
/**
 * @deprecated use JwtService instead
 */
const verifyJWT = (
    token: string,
    options?: VerifyOptions,
): Promise<JwtPayload> =>
    new Promise((resolve, reject) =>
        jwt.verify(
            token,
            JWT_SECRET,
            { ...options, complete: false },
            (error, value) =>
                error ? reject(error) : resolve(value as JwtPayload),
        ),
    );

// export const sign2FAToken = async (sessionId: string) => await signJWT({
//     expiresIn: '10m',
//     subject: sessionId,
//     audience: '2fa',
//     issuer: 'auth'
// })
//
// export const verify2FAToken = (token: string) => verifyJWT(token, {
//     audience: '2fa',
//     issuer: 'auth'
// })
/**
 * @deprecated use JwtService instead
 */
export const signAuthToken = async (sessionId: string) =>
    await signJWT({
        expiresIn: '1y',
        subject: sessionId,
        audience: 'content',
        issuer: 'auth',
    });
/**
 * @deprecated use JwtService instead
 */
export const verifyAuthToken = (token: string) =>
    verifyJWT(token, {
        audience: 'content',
        issuer: 'auth',
    });
