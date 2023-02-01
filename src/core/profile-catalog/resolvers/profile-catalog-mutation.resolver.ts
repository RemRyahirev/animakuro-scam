import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateProfileCatalogInputType } from '../models/inputs/create-profile-catalog-input.type';
import {
    ProfileCatalogMutationType,
    ProfileCatalogRootResolver,
} from './profile-catalog-root.resolver';
import { CreateProfileCatalogResultsType } from '../models/results/create-profile-catalog-results.type';
import { UpdateProfileCatalogResultsType } from '../models/results/update-profile-catalog-results.type';
import { UpdateProfileCatalogInputType } from '../models/inputs/update-profile-catalog-input.type';
import { DeleteProfileCatalogResultsType } from '../models/results/delete-profile-catalog-results.type';
import { ProfileCatalogService } from '../services/profile-catalog.service';

@Resolver(ProfileCatalogMutationType)
export class ProfileCatalogMutationResolver extends ProfileCatalogRootResolver {
    constructor(private profileCatalogService: ProfileCatalogService) {
        super();
    }

    @ResolveField(() => CreateProfileCatalogResultsType)
    async createProfileCatalog(
        @Args() args: CreateProfileCatalogInputType,
    ): Promise<CreateProfileCatalogResultsType> {
        return await this.profileCatalogService.createProfileCatalog(args);
    }

    @ResolveField(() => UpdateProfileCatalogResultsType)
    async updateProfileCatalog(
        @Args() args: UpdateProfileCatalogInputType,
    ): Promise<UpdateProfileCatalogResultsType> {
        return await this.profileCatalogService.updateProfileCatalog(args);
    }

    @ResolveField(() => DeleteProfileCatalogResultsType)
    async deleteProfileCatalog(
        @Args('id') id: string,
    ): Promise<DeleteProfileCatalogResultsType> {
        return await this.profileCatalogService.deleteProfileCatalog(id);
    }
}
