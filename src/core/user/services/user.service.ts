import { ThirdPartyAuthInputType } from '../../auth/models/inputs/third-party-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { HttpStatus, ThirdPartyAuth } from '../../../common/models/enums';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { GqlHttpException } from '../../../common/errors/errors';
import { ValidateAll } from '../handlers/validate-all/validate-all';
import { PaginationService, PrismaService } from '../../../common/services';
import { hash } from '../../../common/utils/password.util';
import { ICustomContext } from '../../../common/models/interfaces';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly paginationService: PaginationService =
        new PaginationService('user');

    constructor(private prisma: PrismaService) {}

    async createUserInfo(args: CreateUserInputType, ctx: ICustomContext) {
        const { userJwtPayload } = ctx;
        if (!userJwtPayload) {
            throw new GqlHttpException(
                'not authorized',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!args.username)
            throw new GqlHttpException(
                'username is empty',
                HttpStatus.BAD_REQUEST,
            );

        if (!args.password)
            throw new GqlHttpException(
                'password is empty',
                HttpStatus.BAD_REQUEST,
            );

        const checkUsername = await this.findUserByUsername(args.username);

        if (checkUsername) {
            throw new GqlHttpException(
                'Username already used',
                HttpStatus.BAD_REQUEST,
            );
        }

        const savedUser = await this.findUserById(userJwtPayload.uid);

        if (!savedUser)
            throw new GqlHttpException(
                'There are no saved user by this email',
                HttpStatus.NOT_FOUND,
            );
        if (!savedUser.email)
            throw new GqlHttpException(
                'email is empty',
                HttpStatus.BAD_REQUEST,
            );

        const checkUsersCount = await this.getUserEmailCount(savedUser.email);

        if (checkUsersCount >= 5) {
            throw new GqlHttpException(
                'Too Many accounts',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashedPassword = await hash(args.password);
        try {
            const user = await this.createUser({
                ...args,
                username: args.username,
                email: savedUser.email,
                password: hashedPassword,
            });
            return {
                success: true,
                user: user as any,
            };
        } catch (e) {
            return { success: true, user: null as any };
        }
    }

    async updateUserInfo(args: UpdateUserInputType) {
        const user = await this.updateUser(args);
        return {
            success: true,
            user: user as any,
        };
    }

    async getUserListInfo(args: PaginationInputType) {
        const userList = await this.getUserList(args);
        const pagination = await this.paginationService.getPagination(args);
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

    async getUsersByEmail(email: string, args: PaginationInputType) {
        const userList = await this.getUserListByEmail(email, args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            userList: userList as any,
            pagination,
        };
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

    async getUserList(args: PaginationInputType) {
        return await this.prisma.user.findMany({
            ...transformPaginationUtil(args),
        });
    }

    async getUserListByEmail(email: string, args: PaginationInputType) {
        return await this.prisma.user.findMany({
            where: { email },
            ...transformPaginationUtil(args),
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

    async getUserEmailCount(email: string) {
        return await this.prisma.user.count({
            where: {
                email,
            },
        });
    }

    async createUser(args: CreateUserInputType) {
        return await this.prisma.user.create({
            data: args as any,
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
