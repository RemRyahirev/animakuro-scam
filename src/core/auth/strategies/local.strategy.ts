import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyConfigService } from '../services/strategy-config.service';
import { UserService } from '../../user/services/user.service';
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private userService: UserService,
        @Inject(forwardRef(() => StrategyConfigService))
        private strategyConfigService: StrategyConfigService
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
    }

    async validate(
        username: string,
        password: string,
        done: any
    ): Promise<void> {
        const account = await this.userService.findUserByUsername(username);
        if (!account) {
            return done(new UnauthorizedException(), undefined);
        }
        const payload = {
            account,
            // access_token
        };
        done(null, payload);
        return done(null, account);
    }
}
