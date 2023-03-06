import { ObjectType } from '@nestjs/graphql';

import { CustomErrorType } from '../types';

@ObjectType()
export class BaseResultsType {
    /**
     * Success operation flag
     */
    success: boolean;

    /**
     * Array of errors, if exists
     */
    errors?: CustomErrorType[];
}
