import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ICustomJwtPayload } from '../../../common/models/interfaces';
import { JwtConfigService } from '../services/jwt-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtTokenService: JwtConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('access_token'),
            ignoreExpiration: true,
            secretOrKey: jwtTokenService.tokenConfig.accessToken.privateKey,
        });
    }

    async validate(payload: ICustomJwtPayload): Promise<ICustomJwtPayload> {
        return {
            uuid: payload.uuid,
            sessionId: payload.sessionId,
        };
    }
}
