import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { AuthType } from '@app/common/models/enums';

@Injectable()
export class StrategyConfigService implements JwtOptionsFactory {
    public config: { [key in keyof typeof AuthType]: any };

    constructor(private configService: ConfigService) {
        this.config = {
            JWT: {
                accessToken: {
                    privateKey: this.configService.get<string>(
                        'ACCESS_TOKEN_SECRET',
                    ),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'ACCESS_TOKEN_SECRET_EXP_IN',
                        ),
                    },
                },
                refreshToken: {
                    privateKey: this.configService.get<string>(
                        'REFRESH_TOKEN_SECRET',
                    ),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'REFRESH_TOKEN_SECRET_EXP_IN',
                        ),
                    },
                },
                emailToken: {
                    privateKey:
                        this.configService.get<string>('EMAIL_TOKEN_SECRET'),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'EMAIL_TOKEN_SECRET_EXP_IN',
                        ),
                    },
                },
                resetPassToken: {
                    privateKey: this.configService.get<string>(
                        'RESET_PASS_TOKEN_SECRET',
                    ),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'RESET_PASS_TOKEN_SECRET_EXP_IN',
                        ),
                    },
                },
            },
            APPLE: {
                clientID: this.configService.get('APPLE_CLIENT_ID'),
                teamID: this.configService.get('APPLE_TEAM_ID'),
                keyID: this.configService.get('APPLE_KEY_ID'),
                callbackURL: this.configService.get('APPLE_CALLBACK_URL'),
                privateKeyLocation: this.configService.get(
                    'APPLE_PRIVATE_KEY_LOCATION',
                ),
                redirectURL: this.configService.get('APPLE_ENDPOINT'),
            },
            FACEBOOK: {
                clientID: this.configService.get('FACEBOOK_CLIENT_ID'),
                clientSecret: this.configService.get('FACEBOOK_CLIENT_SECRET'),
                callbackURL: this.configService.get('FACEBOOK_CALLBACK_URL'),
                redirectURL: this.configService.get('FACEBOOK_ENDPOINT'),
            },
            GOOGLE: {
                clientID: this.configService.get('GOOGLE_CLIENT_ID'),
                clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
                callbackURL: this.configService.get('GOOGLE_CALLBACK_URL'),
                redirectURL: this.configService.get('GOOGLE_ENDPOINT'),
            },
            DISCORD: {
                clientID: this.configService.get('DISCORD_CLIENT_ID'),
                clientSecret: this.configService.get('DISCORD_CLIENT_SECRET'),
                callbackURL: this.configService.get('DISCORD_CALLBACK_URL'),
                redirectURL: this.configService.get('DISCORD_ENDPOINT'),
            },
            TWITTER: {
                clientID: this.configService.get('TWITTER_CLIENT_ID'),
                clientSecret: this.configService.get('TWITTER_CLIENT_SECRET'),
                callbackURL: this.configService.get('TWITTER_CALLBACK_URL'),
            },
        };
    }

    createJwtOptions(): JwtModuleOptions {
        return this.config.JWT.accessToken;
    }
}
