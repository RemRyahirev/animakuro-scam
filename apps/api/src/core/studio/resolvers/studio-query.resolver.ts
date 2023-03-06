import { fieldsMap } from 'graphql-fields-list';
import { Args, Info, ResolveField, Resolver } from '@nestjs/graphql';

import { ProfileId } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationArgsType } from '@app/common/models/inputs';

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
        @ProfileId() profileId: string,
        @Info() info: any,
    ): Promise<GetStudioResultsType> {
        return await this.studioService.getStudio(
            id,
            profileId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListStudioResultsType, {
        middleware: [AuthMiddleware],
    })
    async getStudioList(
        @Args() args: PaginationArgsType,
        @ProfileId() profileId: string,
        @Info() info: any,
    ): Promise<GetListStudioResultsType> {
        return await this.studioService.getStudioList(
            args,
            profileId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }
}
