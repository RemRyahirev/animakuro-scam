import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthType } from '../../../common/models/enums';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class StrategyConfigService implements JwtOptionsFactory {
    public config: { [key in keyof typeof AuthType]: any };

    constructor(private configService: ConfigService) {
        this.config = {
            JWT: {
                accessToken: {
                    privateKey: this.configService.get<string>(
                        'ACCESS_TOKEN_SECRET',
                        '8bc1fcda-de5a-44f8-a1a1-16e47160c5ff',
                    ),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'ACCESS_TOKEN_SECRET_EXP_IN',
                            3600000,
                        ),
                    },
                },
                refreshToken: {
                    privateKey: this.configService.get<string>(
                        'REFRESH_TOKEN_SECRET',
                        '91c5814c-f879-48bc-b27e-ed29c32401c8',
                    ),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'REFRESH_TOKEN_SECRET_EXP_IN',
                            4500000,
                        ),
                    },
                },
                emailToken: {
                    privateKey: this.configService.get<string>(
                        'EMAIL_TOKEN_SECRET',
                        'a8921d9a-0a9a-4db5-a0f0-3590fcf7a115',
                    ),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'EMAIL_TOKEN_SECRET_EXP_IN',
                            6000000,
                        ),
                    },
                },
                resetPassToken: {
                    privateKey: this.configService.get<string>(
                        'RESET_PASS_TOKEN_SECRET',
                        'ae477649-a268-47f5-8d9f-803671275c02',
                    ),
                    signOptions: {
                        expiresIn: this.configService.get<number>(
                            'RESET_PASS_TOKEN_SECRET_EXP_IN',
                            7000000,
                        ),
                    },
                },
            },
            APPLE: {
                clientID: this.configService.get(
                    'APPLE_CLIENT_ID',
                    'apple-test-client-id',
                ),
                teamID: this.configService.get(
                    'APPLE_TEAM_ID',
                    'apple-test-team-id',
                ),
                keyID: this.configService.get(
                    'APPLE_KEY_ID',
                    'apple-test-key-id',
                ),
                callbackURL: this.configService.get(
                    'APPLE_CALLBACK_URL',
                    'apple-test-callback-url',
                ),
                privateKeyLocation: this.configService.get(
                    'APPLE_PRIVATE_KEY_LOCATION',
                    'apple-test-private-key-location',
                ),
                redirectURL: this.configService.get(
                    'APPLE_ENDPOINT',
                    'apple-test-redirect-uri',
                ),
            },
            FACEBOOK: {
                clientID: this.configService.get(
                    'FACEBOOK_CLIENT_ID',
                    'facebook-test-client-id',
                ),
                clientSecret: this.configService.get(
                    'FACEBOOK_CLIENT_SECRET',
                    'facebook-test-client-secret',
                ),
                callbackURL: this.configService.get(
                    'FACEBOOK_CALLBACK_URL',
                    'facebook-test-callback-url',
                ),
                redirectURL: this.configService.get(
                    'FACEBOOK_ENDPOINT',
                    'facebook-test-redirect-uri',
                ),
            },
            GOOGLE: {
                clientID: this.configService.get(
                    'GOOGLE_CLIENT_ID',
                    'google-test-client-id',
                ),
                clientSecret: this.configService.get(
                    'GOOGLE_CLIENT_SECRET',
                    'google-test-client-secret',
                ),
                callbackURL: this.configService.get(
                    'GOOGLE_CALLBACK_URL',
                    'google-test-callback-url',
                ),
                redirectURL: this.configService.get(
                    'GOOGLE_ENDPOINT',
                    'google-test-redirect-uri',
                ),
            },
            DISCORD: {
                clientID: this.configService.get(
                    'DISCORD_CLIENT_ID',
                    'discord-test-client-id',
                ),
                clientSecret: this.configService.get(
                    'DISCORD_CLIENT_SECRET',
                    'discord-test-client-secret',
                ),
                callbackURL: this.configService.get(
                    'DISCORD_CALLBACK_URL',
                    'discord-test-callback-url',
                ),
                redirectURL: this.configService.get(
                    'DISCORD_ENDPOINT',
                    'discord-test-redirect-uri',
                ),
            },
        };
    }

    createJwtOptions(): JwtModuleOptions {
        return this.config.JWT.accessToken;
    }
}
