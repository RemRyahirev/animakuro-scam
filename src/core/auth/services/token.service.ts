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
                issuer: 'auth',
                subject: AuthType.JWT,
                audience: 'content',
                algorithm: 'HS256',
                expiresIn: this.tokenConfig[tokenType].signOptions.expiresIn,
            },
        );
    }

    public async updateToken(userId: string, sessionId: string): Promise<any> {
        const accessToken = await this.generateToken(
            userId,
            sessionId,
            TokenType.ACCESS_TOKEN,
        );
        const refreshToken = await this.generateToken(
            userId,
            sessionId,
            TokenType.REFRESH_TOKEN,
        );
        return { accessToken, refreshToken };
    }
}
