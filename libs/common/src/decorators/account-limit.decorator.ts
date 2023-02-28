import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../services/prisma.service';

@ValidatorConstraint({ async: true })
export class AccountLimitConstraint implements ValidatorConstraintInterface {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) {}

    async validate(value: any, args: ValidationArguments) {
        const usedEmailCount = await this.prisma.user.count({
            where: {
                email: value,
            },
        });
        const count = this.configService.get<number>('USED_EMAIL_COUNT') ?? 5;
        return usedEmailCount < count;
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
