import { IsUUID } from '@nestjs/class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

import { AnimeApproval } from '@app/common/models/enums';

@InputType()
export class SimilarInputType {
    /**
     * parent anime id
     */
    @IsUUID()
    @Field(() => ID)
    id: string;

    /**
     * similar status
     */
    @Field(() => AnimeApproval, { defaultValue: AnimeApproval.PENDING })
    status: AnimeApproval;
}
