import { IsUUID } from '@nestjs/class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import { AnimeRelation } from '../../../common/models/enums';

@InputType()
export class Relate {
    @IsUUID()
    @Field(() => ID, { description: 'parent anime id' })
    id: string;

    @Field(() => AnimeRelation, {
        description: 'relationStatus',
        defaultValue: AnimeRelation.NULL,
    })
    status: AnimeRelation;
}
