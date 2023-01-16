import { PassportStrategy } from '@nestjs/passport';
import { AuthType } from '../../../common/models/enums';
import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
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
        access_token: string,
        refresh_token: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<void> {
        const { id, username, email } = profile;
        const account = {
            uuid: id,
            email: email || null,
            username,
        };
        const payload = {
            account,
            access_token,
        };
        if (!account) {
            return done(new UnauthorizedException(), undefined);
        }
        done(null, payload);
    }
}
