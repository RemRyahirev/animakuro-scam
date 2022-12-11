import { JwtInputPayload } from 'core/auth/services/jwt-token.service';
import { Request, Response } from 'express';

export interface ICustomContext {
    request: Request;

    response: Response & {
        json?: (data: unknown) => void;
    };

    userJwtPayload?: JwtInputPayload;
}
