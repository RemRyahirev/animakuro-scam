import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { ValidationError } from '@nestjs/class-validator';
import { Logger } from '@nestjs/common';

type PrismaErrorExceptionType = {
    code: string;
    clientVersion: string;
    meta?: Record<string, string>;
    batchRequestIdx?: string;
    stacktrace: string[];
};

const PrismaServerOnlyErrors = [
    'P2004',
    'P2005',
    'P2007',
    'P2017',
    'P2021',
    'P2022',
    'P2023',
    'P2025',
    'P2026',
    'P2027',
    'P2028',
    'P2030',
    'P2031',
    'P2034',
];
// see reference: https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
const PrismaErrorCodesMap: Record<string, string> = {
    'P2000': 'The provided value for the column is too long for the column\'s type. Column: {column_name}',
    'P2001': 'The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist',
    'P2002': 'Unique constraint failed on the {constraint}',
    'P2003': 'Foreign key constraint failed on the field: {field_name}',
      'P2004': 'A constraint failed on the database: {database_error}',
      'P2005': 'The value {field_value} stored in the database for the field {field_name} is invalid for the field\'s type',
    'P2006': 'The provided value {field_value} for {model_name} field {field_name} is not valid',
      'P2007': 'Data validation error {database_error}',
    'P2008': 'Failed to parse the query {query_parsing_error} at {query_position}',
    'P2009': 'Failed to validate the query: {query_validation_error} at {query_position}',
    'P2010': 'Raw query failed. Code: {code}. Message: {message}',
    'P2011': 'Null constraint violation on the {constraint}',
    'P2012': 'Missing a required value at {path}',
    'P2013': 'Missing the required argument {argument_name} for field {field_name} on {object_name}.',
    'P2014': 'The change you are trying to make would violate the required relation \'{relation_name}\' between the {model_a_name} and {model_b_name} models.',
    'P2015': 'A related record could not be found. {details}',
    'P2016': 'Query interpretation error. {details}',
      'P2017': 'The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.',
    'P2018': 'The required connected records were not found. {details}',
    'P2019': 'Input error. {details}',
    'P2020': 'Value out of range for the type. {details}',
      'P2021': 'The table {table} does not exist in the current database.',
      'P2022': 'The column {column} does not exist in the current database.',
      'P2023': 'Inconsistent column data: {message}',
    'P2024': 'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})',
      'P2025': 'An operation failed because it depends on one or more records that were required but not found. {cause}',
      'P2026': 'The current database provider doesn\'t support a feature that the query used: {feature}',
      'P2027': 'Multiple errors occurred on the database during query execution: {errors}',
      'P2028': 'Transaction API error: {error}',

      'P2030': 'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema',
      'P2031': 'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set',

    'P2033': 'A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you\'re trying to store large integers',
      'P2034': 'Transaction failed due to a write conflict or a deadlock. Please retry your transaction',
};
const PrismaErrorCodes = Object.keys(PrismaErrorCodesMap);

export function formatError(error: GraphQLError, e?: Error) {
    // console.log('formatError:', error, error.extensions, e);
    let message = error.message.replace(/"/g, "'");
    let details = error.extensions.details;

    const isInternalError = error.extensions?.code === 'INTERNAL_SERVER_ERROR';
    const prismaErrorCode = error.extensions?.exception?.code;
    if (
        isInternalError &&
        prismaErrorCode &&
        PrismaErrorCodes.includes(prismaErrorCode)
    ) {
        if (PrismaServerOnlyErrors.includes(prismaErrorCode)) {
            Logger.error(message, {
                location: error.locations?.[0],
                path: error.path?.join('.'),
                code: error.extensions.code,
                exception: error.extensions.exception,
            });

            message = 'Something went wrong with DB communication.';
            details = undefined;
        } else {
            message = PrismaErrorCodesMap[prismaErrorCode];
            details = (error.extensions.exception as PrismaErrorExceptionType).meta;
        }
    } else if (isInternalError) {
        Logger.error(message, {
            location: error.locations?.[0],
            path: error.path?.join('.'),
            code: error.extensions.code,
            details,
        });
    }

    return {
        message,
        location: error.locations?.[0],
        path: error.path?.join('.'),
        code: error.extensions.code,
        details,
    } as GraphQLFormattedError;
}

export function exceptionFactory(errors: ValidationError[]) {
    return new GraphQLError(
        'Parameter validation error',
        {
            extensions: {
                code: 'BAD_USER_INPUT',
                details: errors.reduce((arr, e) => arr.concat(Object.values(e.constraints as Record<string, string>)), [] as string[]),
            },
        },
    );
};
