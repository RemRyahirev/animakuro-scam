import 'reflect-metadata';
import { AxiosError } from 'axios';
import type { ServerResponse } from 'http';

import { GqlHttpException, HttpStatus } from './errors';
import type { ExtendedGraphQLError } from './types';

const handleExceptions = (error: ExtendedGraphQLError) => {
    if (error.originalError instanceof GqlHttpException) {
        return error.originalError;
    }

    if (error.originalError instanceof AxiosError) {
        const { response } = error.originalError;

        if (response && response.data && response.data.error) {
            const { data, status } = response;

            return new GqlHttpException(data.error, status, data.error.type);
        }
    }

    // ... other exceptions
};

const exceptionsHandler = (
    error: ExtendedGraphQLError,
    response: ServerResponse,
): GqlHttpException => {
    const exception = handleExceptions(error);

    // unexpected errors
    if (!exception) {
        console.error(error);

        return new GqlHttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Unexpected error',
        );
    }

    response.statusCode = exception.statusCode;

    return exception;
};

export default exceptionsHandler;
