import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { ValidationError } from '@nestjs/class-validator';
import { Logger } from '@nestjs/common';

import { formatError, exceptionFactory } from './error-formatter.util';

describe('Error formatter', () => {
    describe('formatError', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('format GraphQL errors', () => {
            jest.spyOn(Logger, 'error').mockImplementation();

            const result = formatError({
                message: 'Cannot query field "errors1" on type "GetListAnimeResultsType". Did you mean "errors"?',
                locations: [{ line: 11, column: 7 }],
                extensions: {
                    code: 'GRAPHQL_VALIDATION_FAILED',
                    exception: {
                        stacktrace: [],
                    },
                },
            } as unknown as GraphQLError);

            expect(result).toEqual({
                message: "Cannot query field 'errors1' on type 'GetListAnimeResultsType'. Did you mean 'errors'?",
                location: { line: 11, column: 7 },
                code: 'GRAPHQL_VALIDATION_FAILED',
            } as GraphQLFormattedError);

            expect(Logger.error).toHaveBeenCalledTimes(0);
        });

        it('write to log on prisma server error', () => {
            jest.spyOn(Logger, 'error').mockImplementation();

            const result = formatError({
                message: 'Invalid `this.prisma.anime.findMany()` invocation in...',
                locations: [{ line: 9, column: 5 }],
                path: ['animeQueries', 'getAnimeList'],
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: {
                        code: 'P2022',
                        clientVersion: '4.8.1',
                        meta: {
                            column: 'anime.title',
                        },
                        batchRequestIdx: undefined,
                        stacktrace: [],
                    },
                },
            } as unknown as GraphQLError);

            expect(result).toEqual({
                message: 'Something went wrong with DB communication.',
                location: { line: 9, column: 5 },
                path: 'animeQueries.getAnimeList',
                code: 'INTERNAL_SERVER_ERROR',
            } as unknown as GraphQLFormattedError);

            expect(Logger.error).toHaveBeenCalledTimes(1);
            expect(Logger.error).toHaveBeenCalledWith(
                'Invalid `this.prisma.anime.findMany()` invocation in...',
                {
                    location: { line: 9, column: 5 },
                    path: 'animeQueries.getAnimeList',
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: {
                        code: 'P2022',
                        clientVersion: '4.8.1',
                        meta: {
                            column: 'anime.title',
                        },
                        batchRequestIdx: undefined,
                        stacktrace: [],
                    },
                },
            );
        });

        it('do not write to log on prisma client error', () => {
            jest.spyOn(Logger, 'error').mockImplementation();

            const result = formatError({
                message: 'Some prisma error due to bad request',
                locations: [{ line: 9, column: 5 }],
                path: ['animeQueries', 'getAnimeList'],
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: {
                        code: 'P2000',
                        clientVersion: '4.8.1',
                        meta: {
                            column: 'anime.title',
                        },
                        batchRequestIdx: undefined,
                        stacktrace: [],
                    },
                },
            } as unknown as GraphQLError);

            expect(result).toEqual({
                message: 'The provided value for the column is too long for the column\'s type. Column: {column_name}',
                location: { line: 9, column: 5 },
                path: 'animeQueries.getAnimeList',
                code: 'INTERNAL_SERVER_ERROR',
                details: {
                    column: 'anime.title',
                },
            } as unknown as GraphQLFormattedError);

            expect(Logger.error).toHaveBeenCalledTimes(0);
        });

        it('write to log if internal server error', () => {
            jest.spyOn(Logger, 'error').mockImplementation();

            const result = formatError({
                message: 'Other internal server error',
                locations: [{ line: 9, column: 5 }],
                path: ['animeQueries', 'getAnimeList'],
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    exception: {
                        stacktrace: [],
                    },
                },
            } as unknown as GraphQLError);

            expect(result).toEqual({
                message: 'Something went wrong with DB communication.',
                location: { line: 9, column: 5 },
                path: 'animeQueries.getAnimeList',
                code: 'INTERNAL_SERVER_ERROR',
            } as unknown as GraphQLFormattedError);

            expect(Logger.error).toHaveBeenCalledTimes(1);
            expect(Logger.error).toHaveBeenCalledWith(
                'Other internal server error',
                {
                    location: { line: 9, column: 5 },
                    path: 'animeQueries.getAnimeList',
                    code: 'INTERNAL_SERVER_ERROR',
                },
            );
        });
    });

    describe('exceptionFactory', () => {
        it('format validation errors', () => {
            const result = exceptionFactory([
                {
                    target: { page: 0, perPage: 0 },
                    value: 0,
                    property: 'page',
                    children: [],
                    constraints: { isPositive: 'page must be a positive number' },
                } as ValidationError,
                {
                    target: { page: 0, perPage: 0 },
                    value: 0,
                    property: 'perPage',
                    children: [],
                    constraints: { isPositive: 'perPage must be a positive number' },
                } as ValidationError,
            ]);

            expect(result.message).toBe('Parameter validation error');
            expect(result.extensions).toEqual({
                code: 'BAD_USER_INPUT',
                details: [
                    'page must be a positive number',
                    'perPage must be a positive number'
                ],
            });
        });
    });
});
