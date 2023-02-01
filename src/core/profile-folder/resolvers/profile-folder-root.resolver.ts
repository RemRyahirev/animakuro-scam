import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateProfileFolderResultsType } from '../models/results/create-profile-folder-results.type';
import { UpdateProfileFolderResultsType } from '../models/results/update-profile-folder-results.type';
import { DeleteProfileFolderResultsType } from '../models/results/delete-profile-folder-results.type';
import { GetListProfileFolderResultsType } from '../models/results/get-list-profile-folder-results.type';
import { GetProfileFolderResultsType } from '../models/results/get-profile-folder-results.type';

@ObjectType()
export class ProfileFolderMutationType {
    @Field(() => CreateProfileFolderResultsType, {
        description: 'Create Profile Folder',
    })
    createProfileFolder: CreateProfileFolderResultsType;

    @Field(() => UpdateProfileFolderResultsType, {
        description: 'Update Profile Folder',
    })
    updateProfileFolder: UpdateProfileFolderResultsType;

    @Field(() => DeleteProfileFolderResultsType, {
        description: 'Delete Profile Folder',
    })
    deleteProfileFolder: DeleteProfileFolderResultsType;
}

@ObjectType()
export class ProfileFolderQueryType {
    @Field(() => GetProfileFolderResultsType, {
        description: 'Get Profile Folder by ID',
    })
    getProfileFolder: GetProfileFolderResultsType;

    @Field(() => GetListProfileFolderResultsType, {
        description: 'Get Profile Folder list',
    })
    getProfileFolderList: GetListProfileFolderResultsType;
}

@Resolver()
export class ProfileFolderRootResolver {
    @Mutation(() => ProfileFolderMutationType, {
        description: 'Profile Folder mutations',
    })
    profileFolderMutations() {
        return {};
    }

    @Query(() => ProfileFolderQueryType, {
        description: 'Profile Folder queries',
    })
    ProfileFolderQueries() {
        return {};
    }
}
