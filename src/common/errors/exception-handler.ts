import 'reflect-metadata';
import { AxiosError } from 'axios';
import { GqlHttpException } from './errors';
import { HttpStatus } from '../models/enums';
import { ServerResponse } from 'http';
import { GraphQLError } from 'graphql';

const handleExceptions = (error: GraphQLError) => {
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
};

export const exceptionsHandler = (
    error: GraphQLError,
    response: ServerResponse,
): GqlHttpException => {
    const exception = handleExceptions(error);
    // unexpected errors
    if (!exception) {
        return new GqlHttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Unexpected error',
        );
    }
    response.statusCode = exception.statusCode;
    return exception;
};
