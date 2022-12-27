import { Database } from '../../../loaders';
import { CreateUserProfileInputType } from '../models/inputs/create-user-profile-input.type';
import { UpdateUserProfileInputType } from '../models/inputs/update-user-profile-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetUserProfileResultsType } from '../models/results/get-user-profile-results.type';
import { GetListUserProfileResultsType } from '../models/results/get-list-user-profile-results.type';
import { CreateUserProfileResultsType } from '../models/results/create-user-profile-results.type';
import { UpdateUserProfileResultsType } from '../models/results/update-user-profile-results.type';
import { DeleteUserProfileResultsType } from '../models/results/delete-user-profile-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

export class UserProfileService {
    private readonly prisma = new Database().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('userProfile');

    async getUserProfile(id: string): Promise<GetUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.findUnique({
            where: {
                id,
            },
            // select:{
            //     displayed_name:true
            // }
        });
        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }

    async getUserProfileList(
        args: PaginationInputType,
    ): Promise<GetListUserProfileResultsType> {
        const userProfileList = await this.prisma.userProfile.findMany({
            ...transformPaginationUtil(args),
        });
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            userProfileList: userProfileList as any,
            pagination,
        };
    }

    async createUserProfile(
        args: CreateUserProfileInputType,
        ctx: ICustomContext,
    ): Promise<CreateUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.create({
            data: args as any,
            include: {},
        });
        return {
            success: true,
            userProfile: userProfile as any,
        };
    }

    async updateUserProfile(
        args: UpdateUserProfileInputType,
        ctx: ICustomContext,
    ): Promise<UpdateUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.update({
            where: { id: args.id },
            data: args as any,
            include: {},
        });
        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }

    async deleteUserProfile(
        id: string,
        ctx: ICustomContext,
    ): Promise<DeleteUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.delete({
            where: { id },
            include: {},
        });
        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }
}
