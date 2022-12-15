/**
 * Throws exeption that can be catched by api middleware
 **/
import { HttpStatus } from '../models/enums/http-status.enum';

export class GqlHttpException extends Error {
    readonly statusCode: HttpStatus;
    readonly error: string;
    readonly message: any;

    /**
     *
     * @param message Any type of message to be sent to client
     * @param statusCode Status Code
     * @param error String that describes error
     */
    constructor(message: any, statusCode: HttpStatus, error?: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.error = error || HttpStatus[statusCode];

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
