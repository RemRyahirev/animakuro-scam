import Database from '../../../database';
import { ThirdPartyAuthInputType } from '../../auth/models/inputs/third-party-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { ThirdPartyAuth } from '../../../common/models/enums';

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

    async findUserByThirdPartyAuth(uid: string, type: ThirdPartyAuth) {
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

    async getUserList(args: PaginationInputType) {
        return await this.prisma.user.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
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
        const { password, ...rest } = args;
        return await this.prisma.user.create({
            data: { ...rest, pass_hash: args.password } as any,
        });
    }
}
