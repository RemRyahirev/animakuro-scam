import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { GetProfileSettingsByIdResultsType } from '../models/results/get-profile-settings-results.type';
import { ProfileSettingsService } from '../services/profile-settings.service';
import { GetListProfileSettingsResultsType } from '../models/results/get-list-profile-settings-results.type';

import {
    ProfileSettingsQueryType,
    ProfileSettingsRootResolver,
} from './profile-settings-root.resolver';

@UseGuards(JwtAuthGuard)
@Resolver(ProfileSettingsQueryType)
export class ProfileSettingsQueryResolver extends ProfileSettingsRootResolver {
    constructor(private profileSettingsService: ProfileSettingsService) {
        super();
    }

    @ResolveField(() => GetProfileSettingsByIdResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getProfileSettingsById(
        @Args('id') id: string,
    ): Promise<GetProfileSettingsByIdResultsType> {
        return await this.profileSettingsService.getProfileSettings(id);
    }

    @ResolveField(() => GetListProfileSettingsResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getProfileSettingsList(
        @Args() args: PaginationInputType,
    ): Promise<GetListProfileSettingsResultsType> {
        return await this.profileSettingsService.getProfileSettingsList(args);
    }
}
