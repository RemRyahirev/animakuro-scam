import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Database } from '../../loaders';

@ValidatorConstraint({ async: true })
export class AccountLimitConstraint implements ValidatorConstraintInterface {
    private readonly prisma = new Database().logic;

    async validate(value: any, args: ValidationArguments) {
        const usedEmailCount = await this.prisma.user.count({
            where: {
                email: value,
            },
        });
        return usedEmailCount < 5;
    }
}

export function AccountLimit(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: AccountLimitConstraint,
        });
    };
}
