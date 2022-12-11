import { validate } from 'class-validator';
import type { ValidationError } from 'class-validator';
import { GqlHttpException, HttpStatus } from 'common/errors/errors';

function formatClassValidatorErrors(
    errors: ValidationError[],
    parentProp = '',
    formatedErrors: string[] = [],
): string[] {
    for (const error of errors) {
        if (error.constraints) {
            if (parentProp) {
                for (const key in error.constraints) {
                    formatedErrors.push(
                        `${parentProp}.${error.constraints[key]}`,
                    );
                }
            } else {
                formatedErrors.push(...Object.values(error.constraints));
            }
        } else {
            return formatClassValidatorErrors(
                error.children || [],
                error.property,
                formatedErrors,
            );
        }
    }
    return formatedErrors;
}

/**
 * Decorator for validating input data with class-validator
 * @param validateSchemas classes with class-validator decorators
 * if there is no classes, decorator will validate all object arguments
 */
export const ValidateSchemas = (validateSchemas = []) => {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        const validateOrThrow = async (value: object) => {
            const errors = formatClassValidatorErrors(await validate(value));

            if (errors.length > 0) {
                throw new GqlHttpException(
                    errors,
                    HttpStatus.BAD_REQUEST,
                    'validationErrors',
                );
            }
        };

        descriptor.value = async function (...args: any[]) {
            for (const arg of args) {
                if (!validateSchemas.length && typeof arg === 'object') {
                    await validateOrThrow(arg);

                    return originalMethod.apply(this, args);
                }

                for (const schema of validateSchemas) {
                    if (arg instanceof schema) {
                        await validateOrThrow(arg);

                        return originalMethod.apply(this, args);
                    }
                }
            }
        };

        return descriptor;
    };
};
