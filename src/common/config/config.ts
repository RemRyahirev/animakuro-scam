import * as dotenv from 'dotenv';

dotenv.config();

export class ConfigParent {
    public get mailConfig() {
        const port = this.get('MAILER_PORT', 465);
        return {
            host: this.get('MAILER_HOST', 'smtp.mail.ru'),
            port,
            secure: port === 465, // true for 465, false for other ports
            auth: {
                user: this.get('MAILER_EMAIL', 'some@mail.ru'), // generated ethereal user
                pass: this.get('MAILER_PASSWORD', 'password'), // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
            },
        };
    }

    public get getFrontendUrl() {
        const PORT = this.get('PORT', 8000);
        return this.get('FRONT_DOMAIN', `http://localhost:${PORT}`);
    }

    public get mailFrom() {
        return {
            name: this.get('MAILER_SENDER_NAME', 'somename'),
            address: this.get('MAILER_EMAIL', 'somename@mail.ru'),
        };
    }

    public get redisUrl() {
        return this.get('REDIS_URL', 'redis://localhost:6379');
    }

    public get(propertyPath: string, defaultValue: string): string;
    public get(propertyPath: string, defaultValue: number): number;
    public get(
        propertyPath: string,
        defaultValue: number | string,
    ): number | string {
        const element = process.env[propertyPath];
        if (!element) return defaultValue;
        const currElement = Number(element);
        return isNaN(currElement) ? element : currElement;
    }
}
