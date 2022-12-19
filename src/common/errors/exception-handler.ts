import 'reflect-metadata';
import { AxiosError } from 'axios';
import { GqlHttpException } from './errors';
import type { ExtendedGraphQLError } from './types';
import { HttpStatus } from '../models/enums';
import { ArgumentValidationError } from 'type-graphql';
import { ValidationError } from 'class-validator';
import { ServerResponse } from 'http';

const handleExceptions = (error: ExtendedGraphQLError) => {
    if (error.originalError instanceof ArgumentValidationError) {
        let errorsArray: any[] = [];
        error.originalError.validationErrors.map((error: ValidationError) => {
            errorsArray.push({
                property: error.property,
                value: error.value,
                message: error.constraints,
            });
        });
        return errorsArray;
    }
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
    error: ExtendedGraphQLError,
    response: ServerResponse,
): ValidationError[] | GqlHttpException => {
    const exception = handleExceptions(error);
    if (Array.isArray(exception)) {
        return {
            ...exception,
        } as any;
    }
    // unexpected errors
    if (!exception) {
        return new GqlHttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Unexpected error',
        );
    }
    if (exception instanceof GqlHttpException) {
        response.statusCode = exception.statusCode;
    }
    return exception;
};
