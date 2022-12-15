import { METADATA_KEY } from '../decorators';

/**
 * Check if the user is allowed to change the field, use '@AllowChangeBy' decorator to define the rules
 **/
export function validateInputPermission(
    target: any,
    uid: string,
    requestorScopes: string[],
) {
    const validationKeys = Reflect.getMetadata(
        METADATA_KEY,
        target,
    ) as string[];

    if (!validationKeys) {
        throw new Error('Should use AllowChangeBy decorator on the field');
    }

    const targetProperies = Object.getOwnPropertyNames(target);

    validationKeys.forEach((key) => {
        if (targetProperies.includes(key) && target[key] !== undefined) {
            const validateFn = Reflect.getMetadata(METADATA_KEY, target, key);

            validateFn(target, uid, requestorScopes);
        }
    });
}
