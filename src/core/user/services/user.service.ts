import { ThirdPartyAuthType } from '../enums/user-third-party-type.enum';
import Database from '../../../database';
import { ThirdPartyAuthInputType } from '../../auth/inputs/third-party-input.type';
import { CreateUserInputType } from '../inputs/create-user-input.type';

export class UserService {
    private readonly prisma = Database.getInstance().logic;

    async createUserWithThirdParty(
        userUsername: string,
        thirdPartyInput: ThirdPartyAuthInputType,
    ) {
        return await this.prisma.user.create({
            data: {
                username: userUsername,
                thirdPartyAuth: {
                    create: thirdPartyInput,
                },
            } as any,
            include: {
                thirdPartyAuth: true,
                siteAuthSessions: true,
            },
        });
    }

    async findUserByThirdpartyAuth(uid: string, type: ThirdPartyAuthType) {
        return await this.prisma.user.findFirst({
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
        return await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

    async findUserById(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findUserSession(sessionId: string, uid: string) {
        return await this.prisma.siteAuthSession.findFirst({
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
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
    }

    async findUserByUsername(username: string) {
        return await this.prisma.user.findFirst({
            where: {
                username,
            },
        });
    }

    async getUserEmailCount(email: string) {
        return await this.prisma.user.count({
            where: {
                email,
            },
        });
    }

    async createUser(args: CreateUserInputType) {
        return await this.prisma.user.create({
            data: { ...args, pass_hash: args.password } as any,
        });
    }
}
