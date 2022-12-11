import validateOrThrow from './validate-or-throw';

/**
 * Decorator for validating input data with class-validator
 * @param validateSchemas classes with class-validator decorators
 * if there is no classes, decorator will validate all object arguments
 */
export const ValidateSchemas = (validateSchemas = []) => {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
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
