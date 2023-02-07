import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AuthType } from '../../../common/models/enums';
import { Request } from 'express';

@Controller('oauth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @Get('google')
    // @UseGuards(AuthGuard(AuthType.GOOGLE))
    // redirectGoogleAccounts(@Req() _req: Request) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard(AuthType.GOOGLE))
    googleAuthRedirect(@Req() req: Request) {
        return this.authService.registerSocial(req?.user, AuthType.GOOGLE);
    }

    // @Get('apple')
    // @UseGuards(AuthGuard(AuthType.APPLE))
    // redirectAppleAccounts(@Req() _req: Request) {}

    @Get('apple/redirect')
    @UseGuards(AuthGuard(AuthType.APPLE))
    appleAuthRedirect(@Req() req: Request) {
        return this.authService.registerSocial(req?.user, AuthType.APPLE);
    }

    // @Get('facebook')
    // @UseGuards(AuthGuard(AuthType.FACEBOOK))
    // redirectFacebookAccounts(@Req() _req: Request) {}

    @Get('facebook/redirect')
    @UseGuards(AuthGuard(AuthType.FACEBOOK))
    facebookAuthRedirect(@Req() req: Request) {
        return this.authService.registerSocial(req?.user, AuthType.FACEBOOK);
    }

    // @Get('discord')
    // @UseGuards(AuthGuard(AuthType.DISCORD))
    // redirectDiscordAccounts(@Req() _req: Request) {}

    @Get('discord/redirect')
    @UseGuards(AuthGuard(AuthType.DISCORD))
    discordAuthRedirect(@Req() req: Request) {
        return this.authService.registerSocial(req?.user, AuthType.DISCORD);
    }
}
