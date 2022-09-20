import { IncomingMessage, ServerResponse } from 'http'
import { Request, Response } from 'express'

export interface ICustomContext {
    request: Request

    response: Response & {
        json?: (data: unknown) => void;
    }
}