import {
    CreateSiteAuthSessionInput,
    UpdateSiteAuthSessionInput,
} from '../../core/auth/models/inputs/site-auth-session.schema';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SessionService {
    constructor(private prisma: PrismaService) {}

    public async createSiteAuthSession({
        user_id,
        ...rest
    }: CreateSiteAuthSessionInput) {
        return await this.prisma.authSession.create({
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
        return await this.prisma.authSession.update({
            where: {
                id,
            },
            data: siteAuthSessionInput,
        });
    }
}
