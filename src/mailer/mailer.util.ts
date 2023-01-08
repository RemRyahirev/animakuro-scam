import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailerUtil {
    private readonly domain: string;

    constructor(
        private configService: ConfigService
    ) {
        this.domain = this.configService.get<string>(
            'FRONT_DOMAIN',
            'https://animakuro.domain',
        );
    }

    public getChangeEmailLink(code: string): string {
        return `${this.domain}/change-email/${code}`;
    }

    public getConfirmLink(code: string): string {
        return `${this.domain}/confirm/${code}`;
    }
}
