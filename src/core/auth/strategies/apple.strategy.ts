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
