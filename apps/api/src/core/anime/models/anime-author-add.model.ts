import { IsOptional, IsUUID } from '@nestjs/class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

import { AnimeRelation } from '@app/common/models/enums';

@InputType()
export class AnimeAuthorAddType {
    @IsUUID(4, { each: true })
    @Field(() => ID, { description: 'author_id' })
    id: string;

    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID], {
        description: 'author_role_id',
    })
    roles: string[];
}
