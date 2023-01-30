import { ProfileFavourites } from '../profile-favourites.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';

@ObjectType()
export class GetProfileFavouritesByIdResultsType extends BaseResultsType {
    @Field(() => ProfileFavourites, {
        nullable: true,
        description: 'Profile favourites by id',
    })
    profileFavourites: ProfileFavourites | null;
}
