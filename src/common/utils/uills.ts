import * as crypto from 'crypto';
import { Config } from '../../loaders';

const config = new Config().logic;

export const generateHash = (length = 40): string => {
    return crypto.randomBytes(length).toString('hex');
};
export const getFrontendUrl = (options: {
    pathname: string;
    params?: Record<string, any>;
}) => {
    const params =
        options.params && new URLSearchParams(options.params).toString();
    const resParams = params ? `?${params}` : '';
    return `${config.getFrontendUrl}${options.pathname}${resParams}`;
};
