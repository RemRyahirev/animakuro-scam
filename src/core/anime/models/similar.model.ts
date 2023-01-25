import { Field, ID, InputType } from '@nestjs/graphql';
import { AnimeApproval } from '../../../common/models/enums';

@InputType()
export class Similar {
    @Field(() => ID, { description: 'parent anime id' })
    id: string;

    @Field(() => AnimeApproval, {
        description: 'similar status',
        defaultValue: AnimeApproval.PENDING,
    })
    status: AnimeApproval;
}
