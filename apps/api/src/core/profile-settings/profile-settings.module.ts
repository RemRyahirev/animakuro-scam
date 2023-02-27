import { Module } from '@nestjs/common';

import { ProfileSettingsService } from './services/profile-settings.service';
import { ProfileSettingsRootResolver } from './resolvers/profile-settings-root.resolver';
import { ProfileSettingsMutationResolver } from './resolvers/profile-settings-mutation.resolver';
import { ProfileSettingsQueryResolver } from './resolvers/profile-settings-query.resolver';

@Module({
    imports: [],
    providers: [
        ProfileSettingsService,
        ProfileSettingsRootResolver,
        ProfileSettingsQueryResolver,
        ProfileSettingsMutationResolver,
    ],
    exports: [],
})
export class ProfileSettingsModule {}
