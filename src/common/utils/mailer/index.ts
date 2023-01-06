import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Config } from '../../../loaders';

export class MailerOld {
    private readonly config = new Config().logic;
    private readonly domain;
    private readonly mailer: nodemailer.Transporter;

    constructor() {
        this.domain = this.config.get(
            'FRONT_DOMAIN',
            'https://animakuro.domain',
        );
        this.mailer = nodemailer.createTransport(
            this.config.mailConfig as SMTPTransport.Options,
            {
                from: this.config.mailFrom,
            },
        );
    }

    public previewUrl(info: SentMessageInfo) {
        return nodemailer.getTestMessageUrl(info);
    }

    private getChangeEmailLink(code: string) {
        return `${this.domain}/change-email/${code}`;
    }

    private getConfirmLink(code: string) {
        return `${this.domain}/confirm/${code}`;
    }

    public async sendConfirmationMail({
        receiverEmail,
        code,
    }: {
        receiverEmail: string;
        code: string;
    }) {
        const link = this.getConfirmLink(code);
        const html = `<b>Test Confirmation Mail</b><br><a href="${link}">Tap here</a>`;
        const subject = 'Email confirmation ✔';
        return await this.sendToMail({
            to: receiverEmail,
            subject,
            html,
        });
    }

    public async changeConfirmationMail({
        receiverEmail,
        code,
        newEmail,
    }: {
        receiverEmail: string;
        code: string;
        newEmail: string;
    }) {
        const link = this.getChangeEmailLink(code);
        const html = `<b>Hey, if you want to change your email to ${newEmail}</b><br><a href="${link}">Tap here</a>`;
        const subject = 'Change Email confirmation ✔';
        return await this.sendToMail({
            to: receiverEmail,
            subject,
            html,
        });
    }

    public sendToMail({
        to,
        subject,
        html,
    }: {
        to: string;
        subject: string;
        html: string;
    }) {
        return this.mailer.sendMail({
            to,
            subject,
            html,
        });
    }
}
