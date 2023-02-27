import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateAuthSessionResultsType } from '../models/results/create-auth-session-results.type';
import { GetAuthSessionResultsType } from '../models/results/get-auth-session-results.type';
import { DeleteAuthSessionResultsType } from '../models/results/delete-auth-session-results.type';
import { GetListAuthSessionResultsType } from '../models/results/get-list-auth-session-results.type';
import { UpdateAuthSessionInputType } from '../models/inputs/update-auth-session-input.type';
import { CreateAuthSessionInputType } from '../models/inputs/create-auth-session-input.type';
import { UpdateAuthSessionResultsType } from '../models/results/update-auth-session-results.type';

@Injectable()
export class AuthSessionService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getAuthSession(id: string): Promise<GetAuthSessionResultsType> {
        const auth_session = await this.prisma.authSession.findUnique({
            where: {
                id,
            },
        });
        if (!auth_session) {
            return {
                success: false,
                auth_session: null,
            };
        }
        return {
            success: true,
            auth_session,
            errors: [],
        };
    }

    async getAuthSessionList(
        args: PaginationInputType,
    ): Promise<GetListAuthSessionResultsType> {
        const auth_session_list = await this.prisma.authSession.findMany({
            ...transformPaginationUtil(args),
        });
        const pagination = await this.paginationService.getPagination(
            'authSession',
            args,
        );
        return {
            success: true,
            errors: [],
            auth_session_list,
            pagination,
        };
    }

    async createAuthSession(
        args: CreateAuthSessionInputType,
    ): Promise<CreateAuthSessionResultsType> {
        const auth_session = await this.prisma.authSession.create({
            data: args,
        });
        return {
            success: true,
            auth_session,
        };
    }

    async updateAuthSession(
        args: UpdateAuthSessionInputType,
    ): Promise<UpdateAuthSessionResultsType> {
        const auth_session = await this.prisma.authSession.update({
            where: { id: args.id },
            data: args,
        });
        return {
            success: true,
            auth_session,
        };
    }

    async deleteAuthSession(id: string): Promise<DeleteAuthSessionResultsType> {
        const auth_session = await this.prisma.authSession.delete({
            where: { id },
        });
        return {
            success: true,
            auth_session,
        };
    }
}
