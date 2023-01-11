import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { LoginInputType } from '../../core/auth/models/inputs/login-input.type';
import { PrismaService } from '../services/prisma.service';

@ValidatorConstraint({ async: true })
export class EntityExistsConstraint implements ValidatorConstraintInterface {
    constructor(private prisma: PrismaService) {}

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
