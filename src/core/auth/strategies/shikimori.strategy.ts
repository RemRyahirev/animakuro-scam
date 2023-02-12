import { PassportStrategy } from '@nestjs/passport';
import { AuthType } from '../../../common/models/enums';
import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Profile, Strategy } from 'passport-shikimori';
import { StrategyConfigService } from '../services/strategy-config.service';

@Injectable()
export class ShikimoriStrategy extends PassportStrategy(
    Strategy,
    AuthType.SHIKIMORI,
) {
    constructor(
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            clientID: strategyConfigService.config.SHIKIMORI.clientID,
            clientSecret: strategyConfigService.config.SHIKIMORI.clientSecret,
            callbackURL: strategyConfigService.config.SHIKIMORI.callbackURL,
            scope: ['user_rates'],
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
            username: username || null,
            profileFields: ['id'],
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
