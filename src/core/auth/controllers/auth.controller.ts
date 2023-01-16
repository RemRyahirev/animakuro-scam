import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AuthType } from '../../../common/models/enums';

@Controller('oauth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard(AuthType.GOOGLE))
    redirectGoogleAccounts(@Req() _req: any) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard(AuthType.GOOGLE))
    googleAuthRedirect(@Req() req: any) {
        return this.authService.registerSocial(req?.user, AuthType.GOOGLE);
    }

    @Get('apple')
    @UseGuards(AuthGuard(AuthType.APPLE))
    redirectAppleAccounts(@Req() _req: any) {}

    @Get('apple/redirect')
    @UseGuards(AuthGuard(AuthType.APPLE))
    appleAuthRedirect(@Req() req: any) {
        return this.authService.registerSocial(req?.user, AuthType.APPLE);
    }

    @Get('facebook')
    @UseGuards(AuthGuard(AuthType.FACEBOOK))
    redirectFacebookAccounts(@Req() _req: any) {}

    @Get('facebook/redirect')
    @UseGuards(AuthGuard(AuthType.FACEBOOK))
    facebookAuthRedirect(@Req() req: any) {
        return this.authService.registerSocial(req?.user, AuthType.FACEBOOK);
    }

    @Get('discord')
    @UseGuards(AuthGuard(AuthType.DISCORD))
    redirectDiscordAccounts(@Req() _req: any) {}

    @Get('discord/redirect')
    @UseGuards(AuthGuard(AuthType.DISCORD))
    discordAuthRedirect(@Req() req: any) {
        return this.authService.registerSocial(req?.user, AuthType.DISCORD);
    }
}
