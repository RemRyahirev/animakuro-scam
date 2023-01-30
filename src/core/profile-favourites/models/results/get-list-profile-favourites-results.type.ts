import { ProfileFavourites } from '../profile-favourites.model';
import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';

@ObjectType()
export class GetListProfileFavouritesResultsType extends BaseResultsType {
    @Field(() => [ProfileFavourites], {
        nullable: true,
        description: 'Profile Favourites list',
    })
    profileFavouritesList: ProfileFavourites[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
