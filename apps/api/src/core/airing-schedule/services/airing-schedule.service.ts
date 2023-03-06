import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PaginationArgsType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { GetAiringScheduleResultsType } from '../models/results/get-airing-schedule-results.type';
import { GetListAiringScheduleResultsType } from '../models/results/get-list-airing-schedule-results.type';
import { CreateAiringScheduleResultsType } from '../models/results/create-airing-schedule-results.type';
import { UpdateAiringScheduleResultsType } from '../models/results/update-airing-schedule-results.type';
import { DeleteAiringScheduleResultsType } from '../models/results/delete-airing-schedule-results.type';
import { CreateAiringScheduleArgsType } from '../models/inputs/create-airing-schedule-args.type';
import { UpdateAiringScheduleArgsType } from '../models/inputs/update-airing-schedule-args.type';
import { GetNextAiringScheduleByAnimeResultsType } from '../models/results/get-next-airing-schedule-by-anime-results.type';
import { GetListAiringScheduleByAnimeResultsType } from '../models/results/get-list-airing-schedule-by-anime-results.type';
import { GetListAiringScheduleInputType } from '../models/inputs/get-list-airing-schedule-input-type';
import { AiringScheduleRelevance } from '../models/enums/airing-schedule-relevance.enum';

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
            include: {
                anime: true,
            },
        });
        if (!airing_schedule) {
            return {
                success: false,
            };
        }
        return {
            success: true,
            airing_schedule: airing_schedule as any,
            errors: [],
        };
    }

    async getAiringScheduleList(
        args: GetListAiringScheduleInputType,
        pages: PaginationArgsType,
    ): Promise<GetListAiringScheduleResultsType> {
        let { start_airing_at, end_airing_at } = args;

        const now = new Date();
        if (args.relevance === AiringScheduleRelevance.RELEASED) {
            end_airing_at =
                !end_airing_at || end_airing_at > now ? now : end_airing_at;
        } else if (args.relevance === AiringScheduleRelevance.PLANNED) {
            start_airing_at =
                !start_airing_at || start_airing_at < now
                    ? now
                    : start_airing_at;
        }

        const prismaOptions: Prisma.AiringScheduleFindManyArgs = {
            ...transformPaginationUtil(pages),
            where: {
                airing_at: {
                    gte: start_airing_at,
                    lte: end_airing_at,
                },
            },
            include: {
                anime: true,
            },
        };

        if (args.sort_field && args.sort_order) {
            prismaOptions.orderBy = {
                [args.sort_field]: args.sort_order,
            };
        }

        const airing_schedule = await this.prisma.airingSchedule.findMany(
            prismaOptions,
        );
        const pagination = await this.paginationService.getPagination(
            'airingSchedule',
            pages,
        );
        return {
            success: true,
            errors: [],
            airing_schedule: airing_schedule as any,
            pagination,
        };
    }

    async getNextAiringScheduleByAnime(
        anime_id: string,
    ): Promise<GetNextAiringScheduleByAnimeResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.findFirst({
            where: {
                anime_id,
                airing_at: {
                    gte: new Date(),
                },
            },
            include: {
                anime: true,
            },
            orderBy: {
                airing_at: 'asc',
            },
        });

        if (!airing_schedule) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            errors: [],
            airing_schedule: airing_schedule as any,
        };
    }

    async getListAiringScheduleByAnime(
        anime_id: string,
        args: PaginationArgsType,
    ): Promise<GetListAiringScheduleByAnimeResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.findMany({
            ...transformPaginationUtil(args),
            where: {
                anime_id,
            },
            include: {
                anime: true,
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
        args: CreateAiringScheduleArgsType,
    ): Promise<CreateAiringScheduleResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.create({
            data: {
                airing_at: args.airing_at,
                name: args.name,
                anime: {
                    connect: {
                        id: args.anime_id,
                    },
                },
                episode: args.episode,
            },
            include: {
                anime: true,
            },
        });

        return {
            success: true,
            errors: [],
            airing_schedule: airing_schedule as any,
        };
    }

    async updateAiringSchedule(
        args: UpdateAiringScheduleArgsType,
    ): Promise<UpdateAiringScheduleResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.update({
            where: { id: args.id },
            data: args,
            include: {
                anime: true,
            },
        });

        return {
            success: true,
            airing_schedule: airing_schedule as any,
        };
    }

    async deleteAiringSchedule(
        id: string,
    ): Promise<DeleteAiringScheduleResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.delete({
            where: { id },
        });
        return {
            success: true,
            airing_schedule: airing_schedule as any,
        };
    }
}
