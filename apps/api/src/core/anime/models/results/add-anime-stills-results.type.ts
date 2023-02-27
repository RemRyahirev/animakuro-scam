import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

@ObjectType()
export class AddAnimeStillsResultsType extends BaseResultsType {
    @Field(() => Int, {
        description: 'Added stills count',
    })
    count: number;
}
