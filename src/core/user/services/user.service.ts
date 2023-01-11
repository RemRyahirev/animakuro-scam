import { ThirdPartyAuthInputType } from '../../auth/models/inputs/third-party-input.type';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { ThirdPartyAuth } from '../../../common/models/enums';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { PaginationService } from '../../../common/services/pagination.service';
import { PasswordService } from '../../../common/services/password.service';
import { PrismaService } from '../../../common/services/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private passwordService: PasswordService,
    ) {}

    async createUserInfo(args: CreateUserInputType, ctx: ICustomContext) {
        const { userJwtPayload } = ctx;
        if (!userJwtPayload) {
            throw new UnauthorizedException('not authorized');
        }
        if (!args.username)
            throw new BadRequestException(
                'username is empty',
            );

        if (!args.password)
            throw new BadRequestException(
                'password is empty',

            );

        const checkUsername = await this.findUserByUsername(args.username);

        if (checkUsername) {
            throw new BadRequestException(
                'Username already used',
            );
        }

        const savedUser = await this.findUserById(userJwtPayload.uid);

        if (!savedUser)
            throw new BadRequestException(
                'There are no saved user by this email',
            );
        if (!savedUser.email)
            throw new BadRequestException(
                'email is empty',
            );

        const checkUsersCount = await this.getUserEmailCount(savedUser.email);

        if (checkUsersCount >= 5) {
            throw new BadRequestException(
                'Too Many accounts',
            );
        }

        const hashedPassword = await this.passwordService.encrypt(args.password);
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
        const pagination = await this.paginationService.getPagination('user', args);
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
        const pagination = await this.paginationService.getPagination('user', args);
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
            throw new NotFoundException('User not found');
        return await this.prisma.user.update({
            where: { id: args.id },
            data: args as any,
        });
    }
}
