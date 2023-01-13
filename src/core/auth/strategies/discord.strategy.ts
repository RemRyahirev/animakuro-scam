import { PassportStrategy } from '@nestjs/passport';
import { AuthType } from '../../../common/models/enums';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-discord';
import { StrategyConfigService } from '../services/strategy-config.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(
    Strategy,
    AuthType.DISCORD,
) {
    constructor(
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            clientID: strategyConfigService.config.DISCORD.clientID,
            clientSecret: strategyConfigService.config.DISCORD.clientSecret,
            callbackURL: strategyConfigService.config.DISCORD.callbackURL,
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { name, emails } = profile;
        const user = {
            // @ts-ignore
            email: emails[0].value,
            firstName: name?.givenName,
            lastName: name?.familyName,
        };
        const payload = {
            user,
            accessToken,
        };

        done(null, payload);
    }
}
