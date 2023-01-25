import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetAiringScheduleResultsType } from '../models/results/get-airing-schedule-results.type';
import { GetListAiringScheduleResultsType } from '../models/results/get-list-airing-schedule-results.type';
import { CreateAiringScheduleResultsType } from '../models/results/create-airing-schedule-results.type';
import { UpdateAiringScheduleResultsType } from '../models/results/update-airing-schedule-results.type';
import { DeleteAiringScheduleResultsType } from '../models/results/delete-airing-schedule-results.type';
import { Injectable } from '@nestjs/common';
import { CreateAiringScheduleInputType } from '../models/inputs/create-airing-schedule-input.type';
import { UpdateAiringScheduleInputType } from '../models/inputs/update-airing-schedule-input.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

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
            }
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
        args: PaginationInputType,
    ): Promise<GetListAiringScheduleResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.findMany({
            ...transformPaginationUtil(args),
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
        args: CreateAiringScheduleInputType,
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
        args: UpdateAiringScheduleInputType,
    ): Promise<UpdateAiringScheduleResultsType> {
        const airing_schedule = await this.prisma.airingSchedule.update({
            where: { id: args.id },
            data: args,
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
