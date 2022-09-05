import { IncomingMessage, ServerResponse } from 'http'

export interface CustomContext {
    request: IncomingMessage & {
        url: string;
    }

    response: ServerResponse & {
        json?: (data: unknown) => void;
    }
}