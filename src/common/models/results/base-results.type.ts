import { Field, ObjectType } from 'type-graphql';
import { CustomErrorType } from '../types';

@ObjectType()
export class BaseResultsType {
    @Field(() => Boolean, {
        nullable: false,
        description: 'Success operation flag',
    })
    success: boolean;

    @Field(() => [CustomErrorType], {
        nullable: true,
        description: 'Array of errors, if exists',
        defaultValue: null,
    })
    errors?: CustomErrorType[];
}
