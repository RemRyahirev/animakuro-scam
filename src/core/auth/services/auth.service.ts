import Database from 'database';
import { RegisterInputType } from '../inputs/register-input.type';
import {
    CreateSiteAuthSessionInput,
    UpdateSiteAuthSessionInput,
} from 'core/auth/inputs/site-auth-session.schema';
import Redis from '../../../loaders/redis';

export class AuthService {
    private readonly prisma = Database.getInstance().logic;
    private readonly redis = Redis.getInstance().logic;

    async setRegisterConfirmation(code: string, data: RegisterInputType) {
        await Redis.getInstance().connect();
        await this.redis
            .set(`confirmation:register:${code}`, JSON.stringify(data), {
                EX: 999999,
            })
            .catch(console.error);
    }

    async getRegisterConfirmation(
        code: string,
    ): Promise<RegisterInputType | null> {
        await Redis.getInstance().connect();
        const data = await this.redis
            .get(`confirmation:register:${code}`)
            .catch(console.error);
        console.log(data);
        if (!data) {
            return null;
        }
        return JSON.parse(data);
    }

    async deleteRegisterConfirmation(code: string) {
        await Redis.getInstance().connect();
        await this.redis
            .del(`confirmation:register:${code}`)
            .catch(console.error);
    }

    async createSiteAuthSession({
        userId,
        ...rest
    }: CreateSiteAuthSessionInput) {
        return await this.prisma.siteAuthSession.create({
            data: {
                userId: userId || '0',
                ...rest,
            },
        });
    }

    async updateSiteAuthSession(
        id: string,
        siteAuthSessionInput: UpdateSiteAuthSessionInput,
    ) {
        return await this.prisma.siteAuthSession.update({
            where: {
                id,
            },
            data: siteAuthSessionInput,
        });
    }
}
