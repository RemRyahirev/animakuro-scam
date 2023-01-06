import {
    CreateSiteAuthSessionInput,
    UpdateSiteAuthSessionInput,
} from '../../core/auth/models/inputs/site-auth-session.schema';
import { Database } from '../../loaders';

export class SessionService {
    private readonly prisma = new Database().logic;

    public async createSiteAuthSession({
        user_id,
        ...rest
    }: CreateSiteAuthSessionInput) {
        return await this.prisma.siteAuthSession.create({
            data: {
                user_id: user_id || '0',
                ...rest,
            },
        });
    }

    public async updateSiteAuthSession(
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
