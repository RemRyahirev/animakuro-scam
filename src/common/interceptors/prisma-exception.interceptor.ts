import { BaseResultsType } from '../models/results';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) =>
                throwError(() => {
                    return <BaseResultsType>{
                        success: false,
                        errors: [
                            {
                                property: 'prisma client error',
                                value: error.code
                                    ? 'error code - ' + error.code
                                    : 'invalid value',
                                reason:
                                    error?.meta?.cause ||
                                    error?.meta?.message ||
                                    error?.message,
                            },
                        ],
                    };
                }),
            ),
        );
    }
}
