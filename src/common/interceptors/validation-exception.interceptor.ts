import {
    ArgumentValidationError,
    MiddlewareFn,
    NextFn,
    ResolverData,
} from 'type-graphql';
import { ValidationError } from 'class-validator';
import { BaseResultsType } from '../models/results';
import { CustomErrorType } from '../models/types';

export const ValidationExceptionInterceptor: MiddlewareFn<any> = async (
    resolverData: ResolverData<{}>,
    next: NextFn,
) => {
    try {
        return await next();
    } catch (error: any) {
        if (error && error instanceof ArgumentValidationError) {
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
    }
};
