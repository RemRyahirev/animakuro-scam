import { Request, Response } from 'express';
import { JwtInputPayload } from '../../../core/auth/types/jwt-input-payload.interface';

export interface ICustomContext {
    request: Request;

    response: Response & {
        json?: (data: unknown) => void;
    };

    userJwtPayload?: JwtInputPayload;
}
