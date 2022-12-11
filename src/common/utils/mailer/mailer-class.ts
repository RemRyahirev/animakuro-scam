import Config from '../../config/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class MailerClass {
    private config = Config.getInstance().logic;
    private readonly _logic: nodemailer.Transporter;
    private static instance: MailerClass;

    private constructor() {
        this._logic = nodemailer.createTransport(
            this.config.mailConfig as SMTPTransport.Options,
            {
                from: this.config.mailFrom,
            },
        );
    }

    public static getInstance(): MailerClass {
        if (!MailerClass.instance) {
            MailerClass.instance = new MailerClass();
        }
        return MailerClass.instance;
    }

    get logic(): nodemailer.Transporter {
        return this._logic;
    }
}
