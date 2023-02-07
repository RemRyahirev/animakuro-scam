import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthType, TokenType } from '../../../common/models/enums';
import { JwtService } from '@nestjs/jwt';
import { ICustomJwtPayload } from '../../../common/models/interfaces';
import { StrategyConfigService } from './strategy-config.service';

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
}
