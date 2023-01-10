import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { LoginInputType } from '../../core/auth/models/inputs/login-input.type';
import { compare } from '../utils/password.util';
import { PrismaService } from '../services';

@ValidatorConstraint({ async: true })
export class ComparePasswordConstraint implements ValidatorConstraintInterface {
    constructor(private prisma: PrismaService) {}

    async validate(value: any, args: ValidationArguments) {
        const inputArgs = args.object as LoginInputType;
        const password = await this.prisma.user
            .findFirst({
                where: {
                    username: inputArgs.username,
                },
            })
            .then((val) => val?.password);
        return await compare(value, password || '');
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
