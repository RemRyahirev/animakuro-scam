import * as crypto from 'crypto';

export const generateHash = (length = 40): string => {
    return crypto.randomBytes(length).toString('hex');
};
