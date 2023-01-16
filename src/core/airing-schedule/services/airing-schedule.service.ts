import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetAiringScheduleResultsType } from '../models/results/get-airing-schedule-results.type';
import { GetListAiringScheduleResultsType } from '../models/results/get-list-airing-schedule-results.type';
import { CreateAiringScheduleResultsType } from '../models/results/create-airing-schedule-results.type';
import { UpdateAiringScheduleResultsType } from '../models/results/update-airing-schedule-results.type';
import { DeleteAiringScheduleResultsType } from '../models/results/delete-airing-schedule-results.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiringScheduleService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getAiringSchedule(id: string): Promise<GetAiringScheduleResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.findUnique({
            where: {
                id,
            },
        });
        if (!airing_schedule) {
            return {
                success: false,
                airing_schedule: null,
            };
        }
        return {
            success: true,
            airing_schedule: airing_schedule as any,
            errors: [],
        };
    }

    async getAiringScheduleList(
        scheduled_animes: string[],
        args: PaginationInputType,
    ): Promise<GetListAiringScheduleResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.findMany({
            where: {
                id: { in: scheduled_animes },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'airingSchedule',
            args,
        );
        return {
            success: true,
            errors: [],
            airing_schedule: airing_schedule as any,
            pagination,
        };
    }

    async createAiringSchedule(
        scheduled_animes_add: string[],
        episodes: number[],
        ctx: ICustomContext,
    ): Promise<CreateAiringScheduleResultsType> {
        for (let i = 0; i < scheduled_animes_add.length; i++) {
            const anime = await this.prisma.anime.findUnique({
                where: { id: scheduled_animes_add[i] },
            });
            const next_episode = anime?.next_episode || '';

            await this.prisma.airingSchedule.create({
                data: {
                    anime_id: scheduled_animes_add[i],
                    episode: episodes[i],
                    airing_at: next_episode,
                    time_until_airing: Math.round(
                        (+next_episode - +new Date()) / 1000,
                    ),
                },
            });
        }

        const airing_schedule: any = await this.prisma.airingSchedule.findMany({
            where: {
                anime_id: { in: scheduled_animes_add },
            },
            include: {
                anime: true,
            },
        });

        return {
            success: true,
            errors: [],
            airing_schedule: airing_schedule,
        };
    }

    // async updateAiringSchedule(
    //     scheduled_animes_add: string[],
    //     scheduled_animes: string[]
    //     episodes: number[],
    //     ctx: ICustomContext,
    // ): Promise<UpdateAiringScheduleResultsType> {
    //     for (let i = 0; i < scheduled_animes_add.length; i++) {
    //         const anime = await this.prisma.anime.findUnique({
    //             where: { id: scheduled_animes_add[i] },
    //         });
    //         const next_episode = anime?.next_episode || '';

    //         await this.prisma.airingSchedule.update({
    //             where: {

    //             }
    //             data: {
    //                 anime_id: scheduled_animes_add[i],
    //                 episode: episodes[i],
    //                 airing_at: next_episode,
    //                 time_until_airing: Math.round(
    //                     (+next_episode - +new Date()) / 1000,
    //                 ),
    //             },
    //         });
    //     }

    //     const airing_schedule: any = await this.prisma.airingSchedule.findMany({
    //         where: {
    //             anime_id: { in: scheduled_animes_add },
    //         },
    //         include: {
    //             anime: true,
    //         },
    //     });
    //     return {
    //         success: true,
    //         genre,
    //     };
    // }

    async deleteAiringSchedule(
        scheduled_animes_remove: string[],
        ctx: ICustomContext,
    ): Promise<DeleteAiringScheduleResultsType> {
        await this.prisma.airingSchedule.deleteMany({
            where: {
                anime_id: {
                    in: scheduled_animes_remove,
                },
            },
        });
        return {
            success: true,
            airing_schedule: null,
        };
    }
}
