import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateProfileCatalogResultsType } from '../models/results/create-profile-catalog-results.type';
import { UpdateProfileCatalogResultsType } from '../models/results/update-profile-catalog-results.type';
import { DeleteProfileCatalogResultsType } from '../models/results/delete-profile-catalog-results.type';
import { GetListProfileCatalogResultsType } from '../models/results/get-list-profile-catalog-results.type';
import { GetProfileCatalogResultsType } from '../models/results/get-profile-catalog-results.type';

@ObjectType()
export class ProfileCatalogMutationType {
    @Field(() => CreateProfileCatalogResultsType, {
        description: 'Create Profile Catalog',
    })
    createProfileCatalog: CreateProfileCatalogResultsType;

    @Field(() => UpdateProfileCatalogResultsType, {
        description: 'Update Profile Catalog',
    })
    updateProfileCatalog: UpdateProfileCatalogResultsType;

    @Field(() => DeleteProfileCatalogResultsType, {
        description: 'Delete Profile Catalog',
    })
    deleteProfileCatalog: DeleteProfileCatalogResultsType;
}

@ObjectType()
export class ProfileCatalogQueryType {
    @Field(() => GetProfileCatalogResultsType, {
        description: 'Get Profile Catalog by ID',
    })
    getProfileCatalog: GetProfileCatalogResultsType;

    @Field(() => GetListProfileCatalogResultsType, {
        description: 'Get Profile Catalog list',
    })
    getProfileCatalogList: GetListProfileCatalogResultsType;
}

@Resolver()
export class ProfileCatalogRootResolver {
    @Mutation(() => ProfileCatalogMutationType, {
        description: 'Profile Catalog mutations',
    })
    profileCatalogMutations() {
        return {};
    }

    @Query(() => ProfileCatalogQueryType, {
        description: 'Profile Catalog queries',
    })
    ProfileCatalogQueries() {
        return {};
    }
}
