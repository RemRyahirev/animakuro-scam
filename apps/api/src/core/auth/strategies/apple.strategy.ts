import { Profile, Strategy } from 'passport-apple';
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
export class AppleStrategy extends PassportStrategy(Strategy, AuthType.APPLE) {
    constructor(
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            clientID: strategyConfigService.config.APPLE.clientID,
            teamID: strategyConfigService.config.APPLE.teamID,
            keyID: strategyConfigService.config.APPLE.keyID,
            callbackURL: strategyConfigService.config.APPLE.callbackURL,
            privateKeyLocation:
                strategyConfigService.config.APPLE.privateKeyLocation,
            scope: ['email', 'name'],
            profileFields: ['email', 'name'],
        });
    }

    async validate(
        access_token: string,
        refresh_token: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<void> {
        const { id, name, email } = profile;
        const account = {
            uuid: id,
            email: email || null,
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
