import 'reflect-metadata';
import { GqlHttpException, HttpStatus } from 'common/errors/errors';

export const METADATA_KEY = 'allow-change-by';

interface AllowChangeByDecoratorOptions {
    /**
     * @param orSameUidAs - The name of the field that contains the uid of the user that created the object
     * @param scopes - The scopes that are allowed to change the object
     */
    orSameUidAsField?: string[];
    scopes?: string[];
}

const containsFieldsWithSameUidAsRequestor = (
    target: any,
    sameUidAs: string[] = [],
    requestorUid: string,
) => {
    return sameUidAs.some((field) => target[field] === requestorUid);
};

const containsAllowedScopes = (
    requestorScopes: string[],
    allowedScopes: string[],
): boolean => {
    const allowedScopeSet = new Set(allowedScopes);

    return requestorScopes.some((scope) => allowedScopeSet.has(scope));
};

/**
 * Use this decorator only with InputType fields, use 'validetePerrmission' function to validete
 **/
export function AllowChangeBy(
    decoratorOptions: AllowChangeByDecoratorOptions = {},
) {
    return (target: any, propertyName: string) => {
        const validateFn = (target: any, uid: string, requestorScopes: any) => {
            if (
                containsAllowedScopes(
                    requestorScopes,
                    decoratorOptions.scopes || [],
                ) ||
                containsFieldsWithSameUidAsRequestor(
                    target,
                    decoratorOptions.orSameUidAsField,
                    uid,
                )
            ) {
                return;
            }

            throw new GqlHttpException(
                `User ${uid} is not allowed to change ${propertyName} field`,
                HttpStatus.FORBIDDEN,
            );
        };

        Reflect.defineMetadata(METADATA_KEY, validateFn, target, propertyName);

        const properties: string[] =
            Reflect.getMetadata(METADATA_KEY, target) || [];

        if (properties.indexOf(propertyName) < 0) {
            properties.push(propertyName);
        }

        Reflect.defineMetadata(METADATA_KEY, properties, target);
    };
}
