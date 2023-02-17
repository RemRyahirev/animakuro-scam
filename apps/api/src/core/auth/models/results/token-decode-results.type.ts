import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

@ObjectType()
export class TokenDecodeResultsType extends BaseResultsType {
    @Field(() => String)
    email?: string;

    @Field(() => String)
    password?: string;

    @Field(() => String)
    username?: string;
}
