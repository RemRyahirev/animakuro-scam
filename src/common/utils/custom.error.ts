export default class CustomError extends Error {
    details?: any;
    constructor(message: string, details?: any) {
        super(message);
        this.details = details;
    }
}
