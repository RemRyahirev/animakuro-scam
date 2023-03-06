import { IsUUID } from '@nestjs/class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

import { AnimeApproval, AnimeRelation } from '@app/common/models/enums';

@InputType()
export class RelateInputType {
    /**
     * parent anime id
     */
    @IsUUID()
    @Field(() => ID)
    id: string;

    /**
     * relationStatus
     */
    @Field(() => AnimeRelation, { defaultValue: AnimeRelation.NULL })
    status: AnimeRelation;
}
