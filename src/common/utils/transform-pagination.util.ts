import { PaginationInputType } from '../models/inputs';

export function transformPaginationUtil<T extends PaginationInputType>(
    args: T,
): any {
    return {
        skip: (args.page - 1) * args.perPage,
        take: args.perPage,
    };
}
