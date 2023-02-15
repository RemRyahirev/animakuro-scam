import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';

@ObjectType()
export class UpdateRatingAnimeResultsType extends BaseResultsType {
    @Field(() => Number, {
        nullable: true,
        description: 'update Anime reyting',
    })
    rating: number;
}
