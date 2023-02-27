import { Response } from 'express';
import { Prisma } from '@prisma/client';

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { PrismaErrorCodesMap } from '@app/common/utils/error-formatter.util';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        console.error(exception.message);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message = exception.message.replace(/\n/g, '');

        switch (exception.code) {
            // TODO add custom exceptions
            case 'P2000': {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: PrismaErrorCodesMap.P2000.replace(
                        'column_name',
                        (exception.meta as { target: string[] }).target.join(
                            ',',
                        ),
                    ),
                });
                break;
            }

            case 'P2002': {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: PrismaErrorCodesMap.P2002.replace(
                        'constraint',
                        (exception.meta as { target: string[] }).target.join(
                            ',',
                        ),
                    ),
                });
                break;
            }

            case 'P2004': {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: PrismaErrorCodesMap.P2004.replace(
                        'database_error',
                        (exception.meta as { target: string[] }).target.join(
                            ',',
                        ),
                    ),
                });
                break;
            }

            case 'P2007': {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: PrismaErrorCodesMap.P2007.replace(
                        'database_error',
                        (exception.meta as { target: string[] }).target.join(
                            ',',
                        ),
                    ),
                });
                break;
            }

            default:
                super.catch(exception, host);
                break;
        }
    }
}
