export class GraphQLError {
    type: string;
    constructor(type: string) {
        this.type = type;
    }

    errorType(): { message: string; statusCode: string | number } {
        switch (this.type) {
            case 'USER_ALREADY_EXISTS':
                return {
                    message: 'Forbidden.',
                    statusCode: 403,
                };
            case 'SERVER_ERROR':
                return {
                    message: 'Server error.',
                    statusCode: 500,
                };
            case 'USER_NOT_FOUND':
                return {
                    message: 'Not Found.',
                    statusCode: 404,
                };
            case 'BAD_REQUEST ':
                return {
                    message: 'Server error.',
                    statusCode: 400,
                };
            case 'UNAUTHORIZED':
                return {
                    message: 'The user is not logged in.',
                    statusCode: 401,
                };
            case 'NO_CONTENT':
                return {
                    message: 'Request parameters are missing.',
                    statusCode: 204,
                };
            case 'LOCKED':
                return {
                    message: 'Access to the server is blocked.',
                    statusCode: 423,
                };
            case 'TOKEN_ERROR':
                return {
                    message: 'Error of the entered token!',
                    statusCode: 401,
                };
            case 'UNAUTHORIZED_BY_EMAIL':
                return {
                    message: 'The email address is not confirmed!',
                    statusCode: 401,
                };
            case 'TOKEN_NOT_FOUND':
                return {
                    message: 'The entered token was not found',
                    statusCode: 401,
                };
            default:
                return {
                    message: 'Server error.',
                    statusCode: 500,
                };
        }
    }
}
