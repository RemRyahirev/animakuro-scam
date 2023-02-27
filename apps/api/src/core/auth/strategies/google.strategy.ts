import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
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
export class GoogleStrategy extends PassportStrategy(
    Strategy,
    AuthType.GOOGLE,
) {
    constructor(
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            clientID: strategyConfigService.config.GOOGLE.clientID,
            clientSecret: strategyConfigService.config.GOOGLE.clientSecret,
            callbackURL: strategyConfigService.config.GOOGLE.callbackURL,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        access_token: string,
        refresh_token: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<void> {
        const { id, name, emails, photos } = profile;
        const account = {
            uuid: id,
            email: emails ? emails[0].value : null,
            username: name?.givenName,
            avatar: photos?.length ? photos[0].value : null,
        };
        //выводить оба имени
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
