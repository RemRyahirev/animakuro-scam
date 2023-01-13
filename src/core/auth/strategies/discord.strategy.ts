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
            profileFields: ['id', 'email', 'username'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { id, username, email } = profile;
        const account = {
            uuid: id,
            email: email || null,
            username,
        };
        const payload = {
            account,
            accessToken,
        };
        done(null, payload);
    }
}
