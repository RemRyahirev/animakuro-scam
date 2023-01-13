import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ICustomJwtPayload } from '../../../common/models/interfaces';
import { AuthType } from '../../../common/models/enums';
import { StrategyConfigService } from '../services/strategy-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthType.JWT) {
    constructor(
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('access_token'),
            ignoreExpiration: true,
            secretOrKey:
                strategyConfigService.config.JWT.accessToken.privateKey,
        });
    }

    async validate(payload: ICustomJwtPayload): Promise<ICustomJwtPayload> {
        return {
            uuid: payload.uuid,
            sessionId: payload.sessionId,
        };
    }
}
