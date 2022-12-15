import { PaginationInputType } from '../models/inputs/pagination-input.type';
import Database from '../../database';
import { PaginationResultsType } from '../models/results/pagination-results.type';
import { PrismaClient } from '@prisma/client';

export class PaginationService {
    protected readonly prisma = Database.getInstance().logic;
    private readonly entityName: keyof PrismaClient;

    constructor(entityName: string) {
        this.entityName = entityName as keyof PrismaClient;
    }

    public async getPagination(
        args: PaginationInputType,
    ): Promise<PaginationResultsType> {
        if (this.checkEntityExistence) {
            // @ts-ignore
            const totalCount = await this.prisma[this.entityName].count();
            const pageCount = Math.ceil(totalCount / args.perPage);
            return {
                page: args.page,
                perPage: args.perPage,
                totalCount,
                pageCount,
            };
        }
        return Promise.reject(
            'Entity, defined in root resolver not found into Prisma',
        );
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
