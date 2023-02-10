import {
    ProfileSettingsQueryType,
    ProfileSettingsRootResolver,
} from '../resolvers/profile-settings-root.resolver';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { GetProfileSettingsByIdResultsType } from '../models/results/get-profile-settings-results.type';
import { ProfileSettingsService } from '../services/profile-settings.service';
import { GetListProfileSettingsResultsType } from '../models/results/get-list-profile-settings-results.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';

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
