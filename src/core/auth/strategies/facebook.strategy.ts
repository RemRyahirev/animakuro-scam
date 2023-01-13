import { PassportStrategy } from '@nestjs/passport';
import { AuthType } from '../../../common/models/enums';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-facebook';
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
            profileFields: ['id', 'email', 'first_name', 'last_name']
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { id, emails, name } = profile;
        const account = {
            uuid: id,
            email: emails ? emails[0].value : null,
            username: name?.familyName,
        };
        const payload = {
            account,
            accessToken,
        };
        done(null, payload);
    }
}
