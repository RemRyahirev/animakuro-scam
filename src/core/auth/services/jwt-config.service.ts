import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    public tokenConfig: any;

    constructor(private configService: ConfigService) {
        this.tokenConfig = {
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
        };
    }

    createJwtOptions(): JwtModuleOptions {
        return this.tokenConfig.accessToken;
    }
}
