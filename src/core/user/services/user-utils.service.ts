import { Database, Redis } from '../../../loaders';
import { PaginationService } from '../../../common/services';
import { RedisClientType } from 'redis';
import { MailerOld } from '../../../common/utils/mailer';

export class UserUtilsService {
    private readonly prisma = new Database().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('user');
    private readonly redis: RedisClientType = new Redis().logic;
    private readonly mailer: MailerOld = new MailerOld();

    async savePassword(email: string, newPassword: string) {
        const user = await this.prisma.user.count({
            where: { email },
        });
        // if (user) {
        //     const password = await hash(newPassword);
        //     await this.prisma.user.update({
        //         where: { email: email as any },
        //         data: { password },
        //     });
        //     return true;
        // }
        return false;
    }

    async saveEmail(oldEmail: string, newEmail: string) {
        const user = await this.prisma.user.count({
            where: { email: oldEmail },
        });
        // if (user) {
        //     await this.prisma.user.update({
        //         where: { email: oldEmail },
        //         data: {
        //             email: newEmail,
        //             isEmailConfirmed: true
        //         } as any,
        //     });
        //     return true;
        // }
        return false;
    }
}
