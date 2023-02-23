import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum ErrorType {
    UNAUTHORIZED_BY_EMAIL = 'UNAUTHORIZED_BY_EMAIL',
    TOKEN_ERROR = 'TOKEN_ERROR',
    LOCKED = 'LOCKED',
    SERVER_ERROR = 'SERVER_ERROR',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    NO_CONTENT = 'NO_CONTENT',
    TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

registerEnumType(ErrorType, {
    name: 'ErrorType',
});
