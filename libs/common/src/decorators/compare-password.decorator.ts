import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from '@nestjs/class-validator';

import { LoginInputType } from '../../../../apps/api/src/core/auth/models/inputs/login-input.type';

import { PasswordService } from '../services/password.service';
import { PrismaService } from '../services/prisma.service';

@ValidatorConstraint({ async: true })
export class ComparePasswordConstraint implements ValidatorConstraintInterface {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService,
    ) {}

    async validate(value: any, args: ValidationArguments) {
        const inputArgs = args.object as LoginInputType;
        const password = await this.prisma.user
            .findFirst({
                where: {
                    username: inputArgs.username,
                },
            })
            .then((val) => val?.password);
        return await this.passwordService.compare(value, password || '');
    }
}

export function ComparePassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: ComparePasswordConstraint,
        });
    };
}
