import { ValidationError } from '@nestjs/class-validator';
import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { CustomErrorType } from '../models/types';

@Catch(ValidationError)
export class ValidationExceptionFilter extends BaseExceptionFilter {
    handle(exception: ValidationError[]): any {
        console.log(exception);
        let errorsArray: CustomErrorType[] = [];
        exception.map((error: ValidationError) => {
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
        return {
            success: false,
            errors: errorsArray,
        };
    }
}
