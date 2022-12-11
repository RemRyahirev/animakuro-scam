import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Config from '../../config/config';
import { SentMessageInfo } from 'nodemailer';

export class Mailer {
    private readonly config = Config.getInstance().logic;
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

    public sendConfirmationMail({
        receiverEmail,
        code,
    }: {
        receiverEmail: string;
        code: string;
    }) {
        const link = this.getConfirmLink(code);
        const html = `<b>Test Confirmation Mail</b><br><a href=${link}>Tap here</a>`;
        const subject = 'Email confirmation ✔';
        return this.sendToMail({
            to: receiverEmail,
            subject,
            html,
        });
    }

    public changeConfirmationMail({
        receiverEmail,
        code,
        newEmail,
    }: {
        receiverEmail: string;
        code: string;
        newEmail: string;
    }) {
        const link = this.getChangeEmailLink(code);
        const html = `<b>Hey, if you want to change your email to ${newEmail}</b><br><a href=${link}>Tap here</a>`;
        const subject = 'Change Email confirmation ✔';
        return this.sendToMail({
            to: receiverEmail,
            subject,
            html,
        });
    }

    private sendToMail({
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
