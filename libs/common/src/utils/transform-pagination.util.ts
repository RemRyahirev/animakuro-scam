import { PaginationInputType } from '@app/common/models/inputs';

export function transformPaginationUtil<T extends PaginationInputType>(
    args: T,
): any {
    return {
        skip: (args.page - 1) * args.perPage,
        take: args.perPage,
    };
}
