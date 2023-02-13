import * as nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { MailPurpose } from '../common/models/enums';
import SMTPTransport, { Options } from 'nodemailer/lib/smtp-transport';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class Mailer implements OnModuleInit {
    private nodemailer: nodemailer.Transporter;

    constructor(private configService: ConfigService) {}

    onModuleInit(): void {
        const port = this.configService.get<number>('MAILER_PORT', 587);
        this.nodemailer = nodemailer.createTransport(<SMTPTransport.Options>{
            pool: true,
            host: this.configService.get<string>('MAILER_HOST', 'smtp.mail.ru'),
            port,
            secure: false,
            auth: {
                user: this.configService.get<string>(
                    'MAILER_EMAIL',
                    'some@mail.ru',
                ),
                pass: this.configService.get<string>(
                    'MAILER_PASSWORD',
                    'password',
                ),
            },
            tls: {
                rejectUnauthorized: false,
            },
            from: {
                name: this.configService.get<string>(
                    'MAILER_SENDER_NAME',
                    'somename',
                ),
                address: this.configService.get<string>(
                    'MAILER_EMAIL',
                    'somename@mail.ru',
                ),
            },
        });
    }

    public async sendMail(
        options: Options,
        purpose: MailPurpose,
        variables?: ReadonlyMap<string, string> | {},
    ): Promise<void> {
        console.log('public async sendMail');
        console.log('to sendMail', options.to);
        console.log('options sendMail', options);
        const rtestmail = await this.nodemailer.sendMail(
            {
                to: options.to,
                subject: options.subject,
                html: this.getMailTemplate(purpose, variables),
            },
            (err, info) => {
                console.log('info', info);
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Successfully sent email to ${options.to}`);
                }
            },
        );
        console.log('rtestmail', rtestmail);
        return rtestmail;
    }

    private getMailTemplate(
        purpose: MailPurpose,
        variables?: ReadonlyMap<string, string> | {},
    ): string {
        const template = handlebars.compile(
            fs.readFileSync(
                path.resolve(__dirname, `templates/${purpose}.handlebars`),
                'utf8',
            ),
        );
        return template(variables);
    }
}
