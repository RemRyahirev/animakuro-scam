import { BaseResultsType } from '../../../../common/models/results';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileFavourites } from '../profile-favourites.model';

@ObjectType()
export class UpdateProfileFavouritesResultsType extends BaseResultsType {
    @Field(() => ProfileFavourites, {
        nullable: true,
        description: 'Profile favourites update',
    })
    profileFavourites: ProfileFavourites | null;
}
