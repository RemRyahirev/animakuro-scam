import { Global, Module } from '@nestjs/common';

import { Mailer } from './mailer';
import { MailerUtil } from './mailer.util';

@Global()
@Module({
    providers: [
        Mailer,
        MailerUtil,
    ],
    exports: [
        Mailer,
    ],
})
export class MailerModule {}
