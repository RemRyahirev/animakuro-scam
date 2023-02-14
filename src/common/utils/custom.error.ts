export default class CustomError extends Error {
    isCustomError = true;
    details?: any;
    constructor(message: string, details?: any) {
        super(message);
        this.details = details;
    }
}
