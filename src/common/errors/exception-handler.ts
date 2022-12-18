import 'reflect-metadata';
import { AxiosError } from 'axios';
import type { ServerResponse } from 'http';

import { GqlHttpException } from './errors';
import type { ExtendedGraphQLError } from './types';
import { HttpStatus } from '../models/enums';

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
    console.log(error, 12123);
    const exception = handleExceptions(error);
    console.log(exception, 877);

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
