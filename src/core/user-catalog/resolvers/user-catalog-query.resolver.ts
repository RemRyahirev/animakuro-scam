import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    UserCatalogQueryType,
    UserCatalogRootResolver,
} from './user-catalog-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserCatalogResultsType } from '../models/results/get-list-user-catalog-results.type';
import { GetUserCatalogResultsType } from '../models/results/get-user-catalog-results.type';
import { UserCatalogService } from '../services/user-catalog.service';

@Resolver(UserCatalogQueryType)
export class UserCatalogQueryResolver extends UserCatalogRootResolver {
    constructor(private userCatalogService: UserCatalogService) {
        super();
    }

    @ResolveField(() => GetUserCatalogResultsType)
    async getUserCatalog(
        @Args('id') id: string,
    ): Promise<GetUserCatalogResultsType> {
        return await this.userCatalogService.getUserCatalog(id);
    }

    @ResolveField(() => GetListUserCatalogResultsType)
    async getUserCatalogList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserCatalogResultsType> {
        return await this.userCatalogService.getUserCatalogList(args);
    }
}
