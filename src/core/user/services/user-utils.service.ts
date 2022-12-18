import { Database, Redis } from '../../../loaders';
import { PaginationService } from '../../../common/services';
import { RedisClientType } from 'redis';
import { Mailer } from '../../../common/utils/mailer';
import { hash } from '../../../common/utils/password.util';
import { registrationStatus } from '../../auth/enums/registration.status.enum';

export class UserUtilsService {
    private readonly prisma = new Database().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('user');
    private readonly redis: RedisClientType = new Redis().logic;
    private readonly mailer: Mailer = new Mailer();

    async savePassword(email: string, newPassword: string) {
        const user = await this.prisma.user.count({
            where: { email },
        });
        if (user) {
            const password = await hash(newPassword);
            await this.prisma.user.update({
                where: { email },
                data: { password },
            });
            return true;
        }
        return false;
    }

    async saveEmail(oldEmail: string, newEmail: string) {
        const user = await this.prisma.user.count({
            where: { email: oldEmail },
        });
        if (user) {
            await this.prisma.user.update({
                where: { email: oldEmail },
                data: {
                    email: newEmail,
                    registrationStatus: registrationStatus.ACTIVE,
                },
            });
            return true;
        }
        return false;
    }
}
