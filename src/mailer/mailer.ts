import * as nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { Singleton } from '../common/decorators';
import { MailPurpose } from '../common/models/enums';
import { Config } from '../loaders';
import SMTPTransport, { Options } from 'nodemailer/lib/smtp-transport';
import * as handlebars from 'handlebars';

@Singleton
export class Mailer {
    private readonly config = new Config().logic;
    private readonly nodemailer: nodemailer.Transporter;

    constructor() {
        this.nodemailer = nodemailer.createTransport(
            this.config.mailConfig as SMTPTransport.Options,
            {
                from: this.config.mailFrom,
            },
        );
    }

    public async sendMail(
        options: Options,
        purpose: MailPurpose,
        variables?: ReadonlyMap<string, string> | {},
    ): Promise<void> {
        return this.nodemailer.sendMail(
            {
                to: options.to,
                subject: options.subject,
                html: this.getMailTemplate(purpose, variables),
            },
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Successfully sent email to ${options.to}`);
                }
            },
        );
    }

    private getMailTemplate(
        purpose: MailPurpose,
        variables?: ReadonlyMap<string, string> | {},
    ): string {
        const template = handlebars.compile(
            fs.readFileSync(
                path.resolve(
                    __dirname,
                    `../../src/mailer/templates/${purpose}.handlebars`,
                ),
                'utf8',
            ),
        );
        return template(variables);
    }
}
