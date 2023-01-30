import { DeleteProfileFavouritesResultsType } from '../models/results/delete-profile-favourites-results.type';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateProfileFavouritesResultsType } from '../models/results/create-profile-favourites-results.type';
import { UpdateProfileFavouritesResultsType } from '../models/results/update-profile-favourites-results.type';
import { GetProfileFavouritesByIdResultsType } from '../models/results/get-profile-favourites-by-id-results.type';
import { GetListProfileFavouritesResultsType } from '../models/results/get-list-profile-favourites-results.type';
import { GetProfileFavouritesResultsType } from '../models/results/get-profile-favourites-results.type';

@ObjectType()
export class ProfileFavouritesMutationType {
    @Field(() => CreateProfileFavouritesResultsType, {
        description: 'Create profile favourites',
    })
    createProfileFavourites: CreateProfileFavouritesResultsType;

    @Field(() => UpdateProfileFavouritesResultsType, {
        description: 'Update profile favourites',
    })
    updateProfileFavourites: UpdateProfileFavouritesResultsType;

    @Field(() => DeleteProfileFavouritesResultsType, {
        description: 'Delete profile favourites',
    })
    deleteProfileFavourites: DeleteProfileFavouritesResultsType;
}

@ObjectType()
export class ProfileFavouritesQueryType {
    @Field(() => GetProfileFavouritesResultsType, {
        description: 'Get profile favourites',
    })
    getProfileFavourites: GetProfileFavouritesResultsType;

    @Field(() => GetProfileFavouritesByIdResultsType, {
        description: 'Get profile favourites by ID',
    })
    getProfileFavouritesById: GetProfileFavouritesByIdResultsType;

    @Field(() => GetListProfileFavouritesResultsType, {
        description: 'Get list profile favourites',
    })
    getProfileFavouritesList: GetProfileFavouritesByIdResultsType;
}

@Resolver()
export class ProfileFavouritesRootResolver {
    @Mutation(() => ProfileFavouritesMutationType, {
        description: 'Profile favourites mutations',
    })
    profileFavouritesMutations() {
        return {};
    }

    @Query(() => ProfileFavouritesQueryType, {
        description: 'Profile favourites queries',
    })
    profileFavouritesQueries() {
        return {};
    }
}
