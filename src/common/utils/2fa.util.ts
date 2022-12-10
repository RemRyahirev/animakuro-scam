import * as speakeasy from 'speakeasy';

export const generateSecret = () =>
    speakeasy.generateSecret({ name: 'Animakuro', length: 20 });

export const verifyCode = (secret: string, code: string) =>
    speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: code,
    });
