import { prisma } from 'server';

import { ThirdPartyAuthType } from '../enums/user-third-party-type.enum';
import { User } from '../schemas/user.schema';
import { CreateUserInput } from '../inputs/create-user.schema';
import { ThirdPartyAuthInput } from '../../auth/inputs/third-party.schema';

export class UserService {
    async createUserWithThirdParty(
        userUsername: string,
        thirdPartyInput: ThirdPartyAuthInput,
    ) {
        return await prisma.user.create({
            data: {
                username: userUsername,
                thirdPartyAuth: {
                    create: thirdPartyInput,
                },
            },
            include: {
                thirdPartyAuth: true,
                siteAuthSessions: true,
            },
        });
    }

    async findUserByThirdpartyAuth(uid: string, type: ThirdPartyAuthType) {
        return await prisma.user.findFirst({
            where: {
                thirdPartyAuth: {
                    uid,
                    type,
                },
            },
            include: {
                thirdPartyAuth: true,
                siteAuthSessions: true,
            },
        });
    }

    async findUserByEmail(email: string) {
        return await prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

    async findUserById(id: string) {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findUserSession(sessionId: string, uid: string) {
        return await prisma.siteAuthSession.findFirst({
            where: {
                id: sessionId,
                userId: uid,
            },
        });
    }

    async findUserByEmailOrUsername(
        email: string,
        username: string | undefined,
    ) {
        return await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
    }

    async findUserByUsername(username: string) {
        return await prisma.user.findFirst({
            where: {
                username,
            },
        });
    }

    async getUserEmailCount(email: string) {
        return await prisma.user.count({
            where: {
                email,
            },
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createUser({ ...data }: CreateUserInput & { username: string }) {
        return await prisma.user.create({
            data,
        });
    }
}
