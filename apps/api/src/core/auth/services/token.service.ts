import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthType, TokenType } from '@app/common/models/enums';
import {
    ICustomJwtPayload,
    EmailJwtPayload,
    ResetPassPayload,
} from '@app/common/models/interfaces';

import { TokenDecodeResultsType } from '../models/results/token-decode-results.type';

import { StrategyConfigService } from './strategy-config.service';
import { ResetPassDecodeResultsType } from '../models/results/reset-pass-decode-result.type';

@Injectable()
export class TokenService {
    constructor(
        private strategyConfigService: StrategyConfigService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    public async generateToken(
        userId: string,
        sessionId: string | null,
        tokenType: TokenType,
    ): Promise<string> {
        return this.jwtService.sign(
            <ICustomJwtPayload>{
                uuid: userId,
                sessionId: sessionId,
            },
            {
                privateKey:
                    this.strategyConfigService.config.JWT[tokenType].privateKey,
                issuer: this.configService.get<string>('JWT_ISSUER', 'auth'),
                subject: AuthType.JWT,
                audience: this.configService.get<string>(
                    'JWT_AUDIENCE',
                    'content',
                ),
                algorithm: 'HS256',
                expiresIn:
                    this.strategyConfigService.config.JWT[tokenType].signOptions
                        .expiresIn,
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

    public async generateEmailToken(
        email: string,
        password: string,
        username: string,
    ): Promise<string> {
        return this.jwtService.sign(
            <EmailJwtPayload>{
                email,
                password,
                username,
            },
            {
                privateKey:
                    this.strategyConfigService.config.JWT[TokenType.EMAIL_TOKEN]
                        .privateKey,
                issuer: this.configService.get<string>('JWT_ISSUER', 'auth'),
                subject: AuthType.JWT,
                audience: this.configService.get<string>(
                    'JWT_AUDIENCE',
                    'content',
                ),
                algorithm: 'HS256',
                expiresIn:
                    this.strategyConfigService.config.JWT[TokenType.EMAIL_TOKEN]
                        .signOptions.expiresIn,
            },
        );
    }

    public async generateResetToken(
        username: string,
        id: string,
    ): Promise<string> {
        return this.jwtService.sign(
            <ResetPassPayload>{
                username,
                id,
            },
            {
                privateKey:
                    this.strategyConfigService.config.JWT[
                        TokenType.RESET_PASS_TOKEN
                    ].privateKey,
                issuer: this.configService.get<string>('JWT_ISSUER', 'auth'),
                subject: AuthType.JWT,
                audience: this.configService.get<string>(
                    'JWT_AUDIENCE',
                    'content',
                ),
                algorithm: 'HS256',
                expiresIn:
                    this.strategyConfigService.config.JWT[
                        TokenType.RESET_PASS_TOKEN
                    ].signOptions.expiresIn,
            },
        );
    }

    public async decodeResetPassToken(
        token: string,
    ): Promise<ResetPassDecodeResultsType> {
        await this.jwtService.verify(token, {
            secret: this.configService.get<string>('RESET_PASS_TOKEN_SECRET'),
        });

        const decoded = this.jwtService.decode(token);
        if (decoded == null || typeof decoded == 'string') {
            return {
                success: false,
                errors: [
                    {
                        property: 'token',
                        value: token,
                        reason: 'Token is invalid',
                    },
                ],
            };
        }
        return {
            id: decoded.id,
            username: decoded.username,
            success: true,
        };
    }

    public async decodeEmailToken(
        token: string,
    ): Promise<TokenDecodeResultsType> {
        try {
            await this.jwtService.verify(token, {
                secret: this.configService.get<string>('EMAIL_TOKEN_SECRET'),
            });
        } catch (err: any) {
            return {
                success: false,
                errors: [
                    {
                        property: 'token',
                        value: token,
                        reason: 'Token is invalid',
                    },
                ],
            };
        }
        const decoded = this.jwtService.decode(token);
        if (decoded == null || typeof decoded == 'string') {
            return {
                success: false,
                errors: [
                    {
                        property: 'token',
                        value: token,
                        reason: 'Token is invalid',
                    },
                ],
            };
        }
        return {
            email: decoded.email,
            password: decoded.password,
            username: decoded.username,
            success: true,
        };
    }

    public async decodeToken(token: string): Promise<TokenDecodeResultsType> {
        try {
            await this.jwtService.verify(token, {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
            });
        } catch (err: any) {
            return {
                success: false,
                errors: [
                    {
                        property: 'token',
                        value: token,
                        reason: 'Token is invalid',
                    },
                ],
            };
        }
        const decoded = this.jwtService.decode(token);
        if (decoded == null || typeof decoded == 'string') {
            return {
                success: false,
                errors: [
                    {
                        property: 'token',
                        value: token,
                        reason: 'Token is invalid',
                    },
                ],
            };
        }
        return {
            email: decoded.email,
            password: decoded.password,
            username: decoded.username,
            success: true,
        };
    }
}
