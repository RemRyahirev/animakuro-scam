import { PaginationInputType } from '../models/inputs';
import { Database } from '../../loaders';
import { PaginationResultsType } from '../models/results';
import { PrismaClient } from '@prisma/client';
import { INestedPagination } from '../models/interfaces';

export class PaginationService {
    protected readonly prisma = new Database().logic;
    private readonly entityName: keyof PrismaClient;
    private totalCount: number = 0;

    constructor(entityName: string) {
        this.entityName = entityName as keyof PrismaClient;
    }

    public async getPagination<
        A extends PaginationInputType,
        C extends INestedPagination | undefined,
    >(args: A, condition?: C): Promise<PaginationResultsType> {
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
        if (condition) {
            // @ts-ignore
            this.totalCount = await this.prisma[this.entityName].count({
                where: {
                    // @ts-ignore
                    [condition.nested_field]: {
                        some: {
                            [condition.search_property]: condition.search_value,
                        },
                    },
                },
            });
        }
        if (!condition) {
            // @ts-ignore
            this.totalCount = await this.prisma[this.entityName].count();
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
