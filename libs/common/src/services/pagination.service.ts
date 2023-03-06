/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PaginationArgsType } from '@app/common/models/inputs';
import { PaginationResultsType } from '@app/common/models/results';
import { INestedPagination } from '@app/common/models/interfaces';

import { PrismaService } from './prisma.service';

@Injectable()
export class PaginationService {
    private entityName: keyof PrismaClient;
    private totalCount: number = 0;

    constructor(protected prisma: PrismaService) {}

    public async getPagination<
        N extends keyof PrismaClient,
        A extends PaginationArgsType,
        C extends INestedPagination | undefined,
    >(entityName: N, args: A, condition?: C): Promise<PaginationResultsType> {
        this.entityName = entityName;

        if (this.checkEntityExistence) {
            await this.calculateTotalCount(condition);
            return {
                page: args.page,
                perPage: args.perPage,
                totalCount: this.totalCount,
                pageCount: this.getPageCount(args.perPage),
            };
        }
        return Promise.reject(
            'Entity, defined in root resolver not found into Prisma',
        );
    }

    private async calculateTotalCount<C extends INestedPagination | undefined>(
        condition: C,
    ): Promise<void> {

        if (!condition) {
            // @ts-ignore
            this.totalCount = await this.prisma[this.entityName].count();
        }
        if (condition) {
            const whereFilters = condition?.where ? Object.fromEntries(
                Object.entries(condition.where).filter(([, value]) => value !== undefined)
            ) : {}

            if (condition.nested_field) {
                whereFilters[condition.nested_field] = {
                    // @ts-ignore
                    some: {[condition.search_property]: condition.search_value}
                }
            }

            // @ts-ignore
            this.totalCount = await this.prisma[this.entityName].count({
                where: {
                    ...whereFilters
                },
            });
        }
        return Promise.resolve();
    }

    private getPageCount(perPage: number): number {
        return Math.ceil(this.totalCount / perPage) ?? 0;
    }

    private get checkEntityExistence(): boolean {
        for (let i = 0; i < Object.keys(this.prisma).length; i++) {
            if (
                this.entityName in this.prisma &&
                this.prisma[this.entityName].hasOwnProperty('count') &&
                Object.keys(this.prisma)[i] === this.entityName
            ) {
                return true;
            }
        }
        return false;
    }
}
