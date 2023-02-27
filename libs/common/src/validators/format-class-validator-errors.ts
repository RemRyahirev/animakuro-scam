import { ValidationError } from 'class-validator';

export function formatClassValidatorErrors(
    errors: ValidationError[],
    parentProp = '',
    formattedErrors: string[] = [],
): string[] {
    for (const error of errors) {
        if (error.constraints) {
            if (parentProp) {
                for (const key in error.constraints) {
                    formattedErrors.push(
                        `${parentProp}.${error.constraints[key]}`,
                    );
                }
            } else {
                formattedErrors.push(...Object.values(error.constraints));
            }
        } else {
            return formatClassValidatorErrors(
                error.children || [],
                error.property,
                formattedErrors,
            );
        }
    }
    return formattedErrors;
}
