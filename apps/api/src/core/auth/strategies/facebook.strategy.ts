import { Profile, Strategy } from 'passport-facebook';
import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthType } from '@app/common/models/enums';

import { StrategyConfigService } from '../services/strategy-config.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
    Strategy,
    AuthType.FACEBOOK,
) {
    constructor(
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            clientID: strategyConfigService.config.FACEBOOK.clientID,
            clientSecret: strategyConfigService.config.FACEBOOK.clientSecret,
            callbackURL: strategyConfigService.config.FACEBOOK.callbackURL,
            scope: 'email',
            profileFields: ['id', 'email', 'first_name', 'last_name'],
        });
    }

    async validate(
        access_token: string,
        refresh_token: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<void> {
        const { id, emails, name } = profile;
        const account = {
            uuid: id,
            email: emails ? emails[0].value : null,
            username: name?.givenName,
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
