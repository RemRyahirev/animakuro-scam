import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    ProfileCatalogQueryType,
    ProfileCatalogRootResolver,
} from './profile-catalog-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListProfileCatalogResultsType } from '../models/results/get-list-profile-catalog-results.type';
import { GetProfileCatalogResultsType } from '../models/results/get-profile-catalog-results.type';
import { ProfileCatalogService } from '../services/profile-catalog.service';

@Resolver(ProfileCatalogQueryType)
export class ProfileCatalogQueryResolver extends ProfileCatalogRootResolver {
    constructor(private profileCatalogService: ProfileCatalogService) {
        super();
    }

    @ResolveField(() => GetProfileCatalogResultsType)
    async getProfileCatalog(
        @Args('id') id: string,
    ): Promise<GetProfileCatalogResultsType> {
        return await this.profileCatalogService.getProfileCatalog(id);
    }

    @ResolveField(() => GetListProfileCatalogResultsType)
    async getProfileCatalogList(
        @Args() args: PaginationInputType,
    ): Promise<GetListProfileCatalogResultsType> {
        return await this.profileCatalogService.getProfileCatalogList(args);
    }
}
