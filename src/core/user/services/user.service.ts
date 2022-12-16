import Database from '../../../database';
import { ThirdPartyAuthInputType } from '../../auth/models/inputs/third-party-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { HttpStatus, ThirdPartyAuth } from '../../../common/models/enums';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { GqlHttpException } from '../../../common/errors/errors';
import { ValidateAll } from '../handlers/validate-all/validate-all';

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

    async getUserListByEmail(email: string, args: PaginationInputType) {
        return await this.prisma.user.findMany({
            where: { email },
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
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

    async updateUser(args: UpdateUserInputType) {
        const user = await this.prisma.user.findUnique({
            where: { id: args.id },
        });
        if (!user)
            throw new GqlHttpException('User not found', HttpStatus.NOT_FOUND);
        const validateAll = new ValidateAll(user as any, args, true);
        const result = await validateAll.run();
        Object.assign(user, result);
        return await this.prisma.user.update({
            where: { id: args.id },
            data: args as any,
        });
    }
}
