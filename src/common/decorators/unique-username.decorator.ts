import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Database } from "../../loaders";

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
    private readonly prisma = new Database().logic;
    async validate(value: any, args: ValidationArguments) {
        const username = await this.prisma.user.findFirst({
            where: {
                username: value
            },
            select: {
                username: true
            }
        }).then(val => val?.username);
        return username !== value;
    }
}

export function Unique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueConstraint,
        });
    };
}
