import { Database } from '../../../loaders';
import { CreateUserAnimeInputType } from '../models/inputs/create-user-anime-input.type';
import { UpdateUserAnimeInputType } from '../models/inputs/update-user-anime-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetUserAnimeResultsType } from '../models/results/get-user-anime-results.type';
import { GetListUserAnimeResultsType } from '../models/results/get-list-user-anime-results.type';
import { CreateUserAnimeResultsType } from '../models/results/create-user-anime-results.type';
import { UpdateUserAnimeResultsType } from '../models/results/update-user-anime-results.type';
import { DeleteUserAnimeResultsType } from '../models/results/delete-user-anime-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

export class UserAnimeService {
    private readonly prisma = new Database().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('userAnime');

    async getUserAnime(id: string): Promise<GetUserAnimeResultsType> {
        const userAnime = await this.prisma.userAnime.findUnique({
            where: {
                id,
            },
            include:{
                userProfile: true
            }
        });
        return {
            success: true,
            errors: [],
            userAnime: userAnime as any,
        };
    }

    async getUserAnimeList(
        args: PaginationInputType,
    ): Promise<GetListUserAnimeResultsType> {
        const userAnimeList = await this.prisma.userAnime.findMany({
            ...transformPaginationUtil(args),
        });
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            userAnimeList: userAnimeList as any,
            pagination,
        };
    }

    async createUserAnime(
        args: CreateUserAnimeInputType,
        ctx: ICustomContext,
    ): Promise<CreateUserAnimeResultsType> {
        const {userProfileId, animeId, ...other} = args;
        const userAnime = await this.prisma.userAnime.create({
            data: {
                ...other as any,
                userProfile: {
                    connect: {
                        id: userProfileId
                    }
                },
                anime: {
                    connect: {
                        id: animeId
                    }
                }
            },
            include:{
                userProfile: true,
                anime: true
            }
        });
        //console.log(userProfile)

        return {
            success: true,
            errors: [],
            userAnime: userAnime as any,
        };
    }

    async updateUserAnime(
        args: UpdateUserAnimeInputType,
        ctx: ICustomContext,
    ): Promise<UpdateUserAnimeResultsType> {
        const userAnime = await this.prisma.userAnime.update({
            where: { id: args.id },
            data: args as any
        });
        return {
            success: true,
            errors: [],
            userAnime: userAnime as any,
        };
    }

    async deleteUserAnime(
        id: string,
        ctx: ICustomContext,
    ): Promise<DeleteUserAnimeResultsType> {
        const userAnime = await this.prisma.userAnime.delete({
            where: { id }
        });
        return {
            success: true,
            errors: [],
            userAnime: userAnime as any,
        };
    }
}
