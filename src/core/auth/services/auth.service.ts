import Database from 'database';
import { RegisterInputType } from '../models/inputs/register-input.type';
import {
    CreateSiteAuthSessionInput,
    UpdateSiteAuthSessionInput,
} from 'core/auth/models/inputs/site-auth-session.schema';
import Redis from '../../../loaders/redis';

export class AuthService {
    private readonly prisma = Database.getInstance().logic;
    private readonly redis = Redis.getInstance().logic;

    async setRegisterConfirmation(code: string, data: RegisterInputType) {
        await this.redis
            .set(`confirmation:register:${code}`, JSON.stringify(data), {
                EX: 300,
            })
            .catch(console.error);
    }

    async getRegisterConfirmation(
        code: string,
    ): Promise<RegisterInputType | null> {
        const data = await this.redis
            .get(`confirmation:register:${code}`)
            .catch(console.error);

        if (!data) {
            return null;
        }
        return JSON.parse(data);
    }

    async deleteRegisterConfirmation(code: string) {
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
