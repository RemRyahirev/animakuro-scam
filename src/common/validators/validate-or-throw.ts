import { validate } from 'class-validator';
import { formatClassValidatorErrors } from './format-class-validator-errors';
import { BadRequestException } from "@nestjs/common";

export default async (value: object) => {
    const errors = formatClassValidatorErrors(await validate(value));
    if (errors.length > 0) {
        throw new BadRequestException(
            errors,
        );
    }
};
