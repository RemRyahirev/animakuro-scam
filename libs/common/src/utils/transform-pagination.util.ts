import { PaginationArgsType } from '@app/common/models/inputs';

export function transformPaginationUtil<T extends PaginationArgsType>(
    args: T,
): any {
    return {
        skip: (args.page - 1) * args.perPage,
        take: args.perPage,
    };
}
