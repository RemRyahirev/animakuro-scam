import { BaseResultsType } from '../../../../common/models/results';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileFavourites } from '../profile-favourites.model';

@ObjectType()
export class CreateProfileFavouritesResultsType extends BaseResultsType {
    @Field(() => ProfileFavourites, {
        nullable: true,
        description: 'Profile favourites create',
    })
    profileFavourites: ProfileFavourites | null;
}
