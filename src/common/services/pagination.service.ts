import { PaginationInputType } from '../models/inputs';
import { Database } from '../../loaders';
import { PaginationResultsType } from '../models/results';
import { PrismaClient } from '@prisma/client';

export class PaginationService {
    protected readonly prisma = new Database().logic;
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
                totalCount: totalCount ?? 0,
                pageCount: pageCount ?? 0,
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
