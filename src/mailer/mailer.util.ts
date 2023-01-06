import { Singleton } from '../common/decorators';
import { Config } from '../loaders';

@Singleton
export class MailerUtil {
    private readonly config = new Config().logic;
    private readonly domain: string;

    constructor() {
        this.domain = this.config.get(
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
