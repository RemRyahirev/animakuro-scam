import { Request, Response } from 'express';
import { IJwtInputPayload } from './jwt-input-payload.interface';

export interface ICustomContext {
    request: Request;

    response: Response & {
        json?: (data: unknown) => void;
    };

    userJwtPayload?: IJwtInputPayload;
}
