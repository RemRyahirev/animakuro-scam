import { ThirdPartyAuthInputType } from '../../auth/models/inputs/third-party-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { ThirdPartyAuth } from '../../../common/models/enums';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { GetListUserResultsType } from "../models/results/get-list-user-results.type";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getUserList(args: PaginationInputType): Promise<GetListUserResultsType> {
        const userList = await this.prisma.user.findMany({
            ...transformPaginationUtil(args),
        });
        const pagination = await this.paginationService.getPagination(
            'user',
            args,
        );
        return {
            success: true,
            errors: [],
            userList: userList as any,
            pagination,
        };
    }

    async getUser(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return {
            success: true,
            user: user as any,
        };
    }

    async getUsersByEmail(email: string, args: PaginationInputType): Promise<GetListUserResultsType> {
        const userList = await this.prisma.user.findMany({
            where: { email },
            ...transformPaginationUtil(args),
        });
        const pagination = await this.paginationService.getPagination('user', args);
        return {
            success: true,
            userList: userList as any,
            pagination,        };
    }

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
                third_party_auth: true,
                site_auth_sessions: true,
            },
        });
    }

    async findUserByThirdPartyAuth(uid: string, type: ThirdPartyAuth) {
        return await this.prisma.user.findFirst({
            where: {
                third_party_auth: {
                    uid,
                    type,
                },
            },
            include: {
                third_party_auth: true,
                site_auth_sessions: true,
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
                user_id: uid,
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

    async createUser(
        args: CreateUserInputType
    ): Promise<CreateUserResultsType> {
        const user = await this.prisma.user.create({
            data: args as any
        });
        return {
            success: true,
            user: user as any
        };
    }

    async updateUser(
        args: UpdateUserInputType
    ): Promise<UpdateUserResultsType> {
        const user = await this.prisma.user.update({
            where: { id: args.id },
            data: args as any
        });
        return {
            success: true,
            user: user as any
        };
    }
}
