import {
    ProfileSettingsQueryType,
    ProfileSettingsRootResolver,
} from '../resolvers/profile-settings-root.resolver';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { GetProfileSettingsByIdResultsType } from '../models/results/get-profile-settings-results.type';
import { ProfileSettingsService } from '../services/profile-settings.service';

@Resolver(ProfileSettingsQueryType)
export class ProfileSettingsQueryResolver extends ProfileSettingsRootResolver {
    constructor(private profileSettingsService: ProfileSettingsService) {
        super();
    }

    @ResolveField(() => GetProfileSettingsByIdResultsType)
    async getProfileSettingsById(
        @Args('id') id: string,
    ): Promise<GetProfileSettingsByIdResultsType> {
        return await this.profileSettingsService.getProfileSettings(id);
    }
}
