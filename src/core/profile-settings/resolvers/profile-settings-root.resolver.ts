import { DeleteProfileSettingsResultsType } from '../models/results/delete-profile-settings-results.type';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateProfileSettingsResultsType } from '../models/results/create-profile-settings-results.type';
import { UpdateProfileSettingsResultsType } from '../models/results/update-profile-settings-results.type';
import { GetProfileSettingsByIdResultsType } from '../models/results/get-profile-settings-results.type';

@ObjectType()
export class ProfileSettingsMutationType {
    @Field(() => CreateProfileSettingsResultsType, {
        description: 'Create profile settings',
    })
    createProfileSettings: CreateProfileSettingsResultsType;

    @Field(() => UpdateProfileSettingsResultsType, {
        description: 'Update profile settings',
    })
    updateProfileSettings: UpdateProfileSettingsResultsType;

    @Field(() => DeleteProfileSettingsResultsType, {
        description: 'Delete profile settings',
    })
    deleteProfileSettings: DeleteProfileSettingsResultsType;
}

@ObjectType()
export class ProfileSettingsQueryType {
    @Field(() => GetProfileSettingsByIdResultsType, {
        description: 'Get profile settings by ID',
    })
    getProfileSettingsById: GetProfileSettingsByIdResultsType;
}

@Resolver()
export class ProfileSettingsRootResolver {
    @Mutation(() => ProfileSettingsMutationType, {
        description: 'Profile settings mutations',
    })
    profileSettingsMutations() {
        return {};
    }

    @Query(() => ProfileSettingsQueryType, {
        description: 'Profile settings queries',
    })
    profileSettingsQueries() {
        return {};
    }
}
