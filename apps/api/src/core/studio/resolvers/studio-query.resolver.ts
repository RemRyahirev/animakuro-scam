import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { GetStudioResultsType } from '../models/results/get-studio-results.type';
import { GetListStudioResultsType } from '../models/results/get-list-studio-results.type';
import { StudioService } from '../services/studio.service';

import { StudioQueryType, StudioRootResolver } from './studio-root.resolver';

@Resolver(StudioQueryType)
export class StudioQueryResolver extends StudioRootResolver {
    constructor(private studioService: StudioService) {
        super();
    }

    @ResolveField(() => GetStudioResultsType, { middleware: [AuthMiddleware] })
    async getStudio(
        @Args('id') id: string,
        @AccessToken() userId: string,
    ): Promise<GetStudioResultsType> {
        return await this.studioService.getStudio(id, userId);
    }

    @ResolveField(() => GetListStudioResultsType, {
        middleware: [AuthMiddleware],
    })
    async getStudioList(
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
    ): Promise<GetListStudioResultsType> {
        return await this.studioService.getStudioList(args, userId);
    }
}
