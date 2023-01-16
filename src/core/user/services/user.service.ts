import { Injectable } from "@nestjs/common";
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { GetListUserResultsType } from "../models/results/get-list-user-results.type";
import { User } from "../models/user.model";
import { GetUserResultsType } from "../models/results/get-user-results.type";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getUserList(
        args: PaginationInputType,
    ): Promise<GetListUserResultsType> {
        const userList = await this.prisma.user.findMany({
            ...transformPaginationUtil(args),
            include: {
                auth: true
            }
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

    async getUser(user: User): Promise<GetUserResultsType> {
        return {
            success: true,
            user,
        };
    }

    async getUsersByEmail(
        email: string,
        args: PaginationInputType,
    ): Promise<GetListUserResultsType> {
        const userList = await this.prisma.user.findMany({
            where: { email },
            ...transformPaginationUtil(args),
            include: {
                auth: true
            }
        });
        const pagination = await this.paginationService.getPagination(
            'user',
            args,
        );
        return {
            success: true,
            userList: userList as any,
            pagination,
        };
    }

    async findOneById(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                auth: true
            }
        });
    }

    async findUserSession(sessionId: string, uid: string) {
        return await this.prisma.authSession.findFirst({
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
            include: {
                auth: true
            }
        });
    }

    async createUser(
        args: CreateUserInputType,
    ): Promise<CreateUserResultsType> {
        const user = await this.prisma.user.create({
            data: args as any,
            include: {
                auth: true
            }
        });
        return {
            success: true,
            user: user as any,
        };
    }

    async updateUser(
        args: UpdateUserInputType,
    ): Promise<UpdateUserResultsType> {
        const user = await this.prisma.user.update({
            where: { id: args.id },
            data: args as any,
            include: {
                auth: true
            }
        });
        return {
            success: true,
            user: user as any,
        };
    }
}
