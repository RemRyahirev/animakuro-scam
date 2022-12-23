import { MiddlewareFn, NextFn, ResolverData } from 'type-graphql';
import { BaseResultsType } from '../models/results';

export const PrismaExceptionInterceptor: MiddlewareFn<any> = async (
    resolverData: ResolverData<{}>,
    next: NextFn,
) => {
    try {
        return await next();
    } catch (error: any) {
        if (error) {
            return <BaseResultsType>{
                success: false,
                errors: [
                    {
                        property: 'prisma client error',
                        value: error.code ? 'error code - ' + error.code : 'invalid value',
                        reason: error?.meta?.cause || error?.meta?.message || error?.message,
                    },
                ],
            };
        }
        throw error;
    }
};
