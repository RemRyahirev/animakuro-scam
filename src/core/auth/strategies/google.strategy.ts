import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthType } from '../../../common/models/enums';
import { StrategyConfigService } from '../services/strategy-config.service';

Injectable();
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
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<any> {
        const { id, name, emails } = profile;
        const account = {
            uuid: id,
            email: emails ? emails[0].value : null,
            username: name?.givenName,
        };
        const payload = {
            account,
            accessToken,
        };
        done(null, payload);
    }
}
