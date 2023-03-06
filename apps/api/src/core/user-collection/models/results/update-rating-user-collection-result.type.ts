import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

@ObjectType()
export class UpdateRatingUserCollectionResultsType extends BaseResultsType {
    @Field(() => Int, {
        nullable: true,
        description: 'update User-Colection rating',
    })
    rating: number;
}
