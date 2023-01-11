import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthType, TokenType } from '../../../common/models/enums';
import { sign } from 'jsonwebtoken';

@Injectable()
export class TokenService implements OnModuleInit {
    private tokenConfig: any;

    constructor(private configService: ConfigService) {}

    onModuleInit(): void {
        this.tokenConfig = {
            accessToken: {
                privateKey: this.configService.get<string>(
                    'ACCESS_TOKEN_SECRET',
                    'default-value',
                ),
                signOptions: {
                    expiresIn: this.configService.get<number>(
                       'ACCESS_TOKEN_SECRET_EXP_IN',
                        3600,
                    ),
                },
            },
            refreshToken: {
                privateKey: this.configService.get<string>(
                    'REFRESH_TOKEN_SECRET',
                    'default-value'
                ),
                signOptions: {
                    expiresIn: this.configService.get<number>(
                        'REFRESH_TOKEN_SECRET_EXP_IN',
                        60
                    ),
                },
            },
            emailToken: {
                privateKey: this.configService.get<string>(
                    'EMAIL_TOKEN_SECRET',
                    'default-value'
                ),
                signOptions: {
                    expiresIn: this.configService.get<number>(
                        'EMAIL_TOKEN_SECRET_EXP_IN',
                        6000
                    ),
                },
            },
            resetPassToken: {
                privateKey: this.configService.get<string>(
                    'RESET_PASS_TOKEN_SECRET',
                    'default-value'
                ),
                signOptions: {
                    expiresIn: this.configService.get<number>(
                        'RESET_PASS_TOKEN_SECRET_EXP_IN',
                        7000
                    ),
                },
            },
        };
    }

    public async generateToken(
        userId: string,
        sessionId: string | null,
        tokenType: TokenType,
    ): Promise<string> {
        return sign(
            {
                uuid: userId,
                sessionId: sessionId,
            },
            this.tokenConfig[tokenType].privateKey,
            {
                issuer: this.configService.get<string>('JWT_ISSUER', 'auth'),
                subject: AuthType.JWT,
                audience: this.configService.get<string>('JWT_AUDIENCE', 'content'),
                algorithm: 'HS256',
                expiresIn: this.tokenConfig[tokenType].signOptions.expiresIn,
            },
        );
    }

    public async updateToken(userId: string, sessionId: string): Promise<any> {
        const access_token = await this.generateToken(
            userId,
            sessionId,
            TokenType.ACCESS_TOKEN,
        );
        const refresh_token = await this.generateToken(
            userId,
            sessionId,
            TokenType.REFRESH_TOKEN,
        );
        return { access_token, refresh_token };
    }
}
