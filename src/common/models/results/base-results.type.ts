import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BaseResultsType {
    @Field(() => Boolean, {
        nullable: false,
        description: 'Success operation flag',
    })
    success: boolean;

    @Field(() => [String], {
        nullable: true,
        description: 'Array of errors, if exists',
        defaultValue: null,
    })
    errors?: string[];
}
