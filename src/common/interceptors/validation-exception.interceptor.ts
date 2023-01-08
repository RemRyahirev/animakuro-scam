import { BaseResultsType } from '../models/results';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ArgumentValidationError } from 'type-graphql';
import { CustomErrorType } from '../models/types';
import { ValidationError } from '@nestjs/class-validator';

@Injectable()
export class ValidationExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) =>
                throwError(() => {
                    if (error instanceof ArgumentValidationError) {
                        let errorsArray: CustomErrorType[] = [];
                        error.validationErrors.map((error: ValidationError) => {
                            for (const key in error.constraints) {
                                errorsArray.push({
                                    property: error.property,
                                    value: Array.isArray(error.value)
                                        ? 'empty array'
                                        : error.value,
                                    reason: error.constraints[key],
                                });
                            }
                        });
                        return <BaseResultsType>{
                            success: false,
                            errors: errorsArray,
                        };
                    }
                    throw error;
                }),
            ),
        );
    }
}
