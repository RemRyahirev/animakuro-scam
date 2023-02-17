import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AuthType } from '@app/common/models/enums';
import { ICustomJwtPayload } from '@app/common/models/interfaces';

import { UserService } from '../../user/services/user.service';
import { StrategyConfigService } from '../services/strategy-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthType.JWT) {
    constructor(
        private userService: UserService,
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authentication'),
            ignoreExpiration: true,
            secretOrKey:
                strategyConfigService.config.JWT.accessToken.privateKey,
        });
    }

    async validate(
        jwtPayload: ICustomJwtPayload,
        done: VerifiedCallback,
    ): Promise<void> {
        const account = await this.userService.findOneById(jwtPayload.uuid);
        if (!account) {
            return done(new UnauthorizedException(), undefined);
        }
        const payload = {
            account,
            jwtPayload,
        };
        done(null, payload);
        return done(null, account);
    }
}
