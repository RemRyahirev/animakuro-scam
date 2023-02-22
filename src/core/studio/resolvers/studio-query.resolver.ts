import { Args, Info, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import { StudioQueryType, StudioRootResolver } from './studio-root.resolver';
import { GetStudioResultsType } from '../models/results/get-studio-results.type';
import { GetListStudioResultsType } from '../models/results/get-list-studio-results.type';
import { StudioService } from '../services/studio.service';
import { AccessToken } from '../../../common/decorators';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { fieldsMap } from 'graphql-fields-list';

@Resolver(StudioQueryType)
export class StudioQueryResolver extends StudioRootResolver {
    constructor(private studioService: StudioService) {
        super();
    }

    @ResolveField(() => GetStudioResultsType, { middleware: [AuthMiddleware] })
    async getStudio(
        @Args('id') id: string,
        @AccessToken() userId: string,
        @Info() info: any,
    ): Promise<GetStudioResultsType> {
        return await this.studioService.getStudio(
            id,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListStudioResultsType, {
        middleware: [AuthMiddleware],
    })
    async getStudioList(
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
        @Info() info: any,
    ): Promise<GetListStudioResultsType> {
        return await this.studioService.getStudioList(
            args,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }
}
