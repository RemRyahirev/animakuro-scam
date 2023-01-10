import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../../user/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(
        username: string,
        password: string,
    ): Promise<UnauthorizedException | User> {
        const user: User | null = await this.authService.validateUser({
            username,
            password,
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
