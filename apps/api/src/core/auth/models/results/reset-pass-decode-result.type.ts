import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

@ObjectType()
export class ResetPassDecodeResultsType extends BaseResultsType {
    @Field(() => String)
    id?: string;

    @Field(() => String)
    username?: string;
}
