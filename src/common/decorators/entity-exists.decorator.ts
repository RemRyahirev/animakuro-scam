import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Database } from '../../loaders';
import { LoginInputType } from '../../core/auth/models/inputs/login-input.type';

@ValidatorConstraint({ async: true })
export class EntityExistsConstraint implements ValidatorConstraintInterface {
    private readonly prisma = new Database().logic;

    async validate(value: any, args: ValidationArguments) {
        const inputArgs = args.object as LoginInputType;
        const user = await this.prisma.user.findFirst({
            where: {
                username: inputArgs.username,
            },
        });
        return !!user;
    }
}

export function EntityExists(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EntityExistsConstraint,
        });
    };
}
