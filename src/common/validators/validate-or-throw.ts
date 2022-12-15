import { validate } from 'class-validator';
import { GqlHttpException } from '../errors/errors';
import { HttpStatus } from '../models/enums/http-status.enum';
import { formatClassValidatorErrors } from './format-class-validator-errors';

export default async (value: object) => {
    const errors = formatClassValidatorErrors(await validate(value));
    if (errors.length > 0) {
        throw new GqlHttpException(
            errors,
            HttpStatus.BAD_REQUEST,
            'validationErrors',
        );
    }
};
