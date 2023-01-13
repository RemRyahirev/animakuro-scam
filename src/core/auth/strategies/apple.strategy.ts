import { PassportStrategy } from '@nestjs/passport';
import { AuthType } from '../../../common/models/enums';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-apple';
import { StrategyConfigService } from '../services/strategy-config.service';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, AuthType.APPLE) {
    constructor(
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            clientID: strategyConfigService.config.APPLE.clientID,
            clientSecret: strategyConfigService.config.APPLE.clientSecret,
            callbackURL: strategyConfigService.config.APPLE.callbackURL,
            scope: ['email', 'name'],
            profileFields: ['email', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { id, name, email } = profile;
        const account = {
            uuid: id,
            email: email || null,
            username: name?.givenName,
        };
        const payload = {
            account,
            accessToken,
        };
        done(null, payload);
    }
}
