import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

@ObjectType()
export class UpdateRatingAnimeResultsType extends BaseResultsType {
    @Field(() => Number, {
        nullable: true,
        description: 'update Anime rating',
    })
    rating: number;
}
