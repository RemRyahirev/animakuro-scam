import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const mailConfig = {
    host: process.env.MAILER_HOST || '',
    port: process.env.MAILER_PORT ? +process.env.MAILER_PORT : 465,
    from: {
        name: process.env.MAILER_SENDER_NAME || '',
        address: process.env.MAILER_EMAIL || '',
    },
};

const mailer = nodemailer.createTransport(
    {
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.port === 465, // true for 465, false for other ports
        auth: {
            user: process.env.MAILER_EMAIL, // generated ethereal user
            pass: process.env.MAILER_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false,
        },
    } as SMTPTransport.Options,
    {
        // host: mailConfig.host,
        from: {
            name: mailConfig.from.name,
            address: mailConfig.from.name,
        },
    },
);

export const sendEmailRegistrationConfirmationMail = (
    receiverEmail: string,
    link: string,
) =>
    mailer.sendMail({
        to: receiverEmail, // list of receivers
        subject: 'Email confirmation ✔', // Subject line
        html: `<b>Test Confirmation Mail</b><br><a href=${link}>Tap here</a>`, // html body
    });

export const sendEmailChangeConfirmationMail = (
    receiverEmail: string,
    link: string,
    newEmail: string,
) =>
    mailer.sendMail({
        to: receiverEmail, // list of receivers
        subject: 'Change Email confirmation ✔', // Subject line
        html: `<b>Hey, if you want to change your email to ${newEmail}</b><br><a href=${link}>Tap here</a>`, // html body
    });

export const previewUrl = (info: SentMessageInfo) =>
    nodemailer.getTestMessageUrl(info);
