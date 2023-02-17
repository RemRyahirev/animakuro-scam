import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { CreateProfileSettingsResultsType } from '../models/results/create-profile-settings-results.type';
import { CreateProfileSettingsInputType } from '../models/inputs/create-profile-settings-input.type';
import { UpdateProfileSettingsResultsType } from '../models/results/update-profile-settings-results.type';
import { UpdateProfileSettingsInputType } from '../models/inputs/update-profile-settings-input.type';
import { DeleteProfileSettingsResultsType } from '../models/results/delete-profile-settings-results.type';
import { ProfileSettingsService } from '../services/profile-settings.service';

import {
    ProfileSettingsMutationType,
    ProfileSettingsRootResolver,
} from './profile-settings-root.resolver';

@UseGuards(JwtAuthGuard)
@Resolver(ProfileSettingsMutationType)
export class ProfileSettingsMutationResolver extends ProfileSettingsRootResolver {
    constructor(private profileSettingsService: ProfileSettingsService) {
        super();
    }

    @ResolveField(() => CreateProfileSettingsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createProfileSettings(
        @Args() args: CreateProfileSettingsInputType,
    ): Promise<CreateProfileSettingsResultsType> {
        return await this.profileSettingsService.createProfileSettings(args);
    }

    @ResolveField(() => UpdateProfileSettingsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateProfileSettings(
        @Args() args: UpdateProfileSettingsInputType,
    ): Promise<UpdateProfileSettingsResultsType> {
        return await this.profileSettingsService.updateProfileSettings(args);
    }

    @ResolveField(() => DeleteProfileSettingsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteProfileSettings(
        @Args('id') id: string,
    ): Promise<DeleteProfileSettingsResultsType> {
        return await this.profileSettingsService.deleteProfileSettings(id);
    }
}
