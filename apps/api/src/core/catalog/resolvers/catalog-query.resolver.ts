import { Resolver, ResolveField, Args } from '@nestjs/graphql';

import { PaginationArgsType } from '@app/common/models/inputs';

import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { CatalogAnimeArgsType } from '../models/inputs/catalog-anime-args.type';
import { CatalogService } from '../services/catalog.service';
import { GetCatalogAuthorResultsType } from '../models/results/get-catalog-author-results.type';
import { CatalogAuthorArgsType } from '../models/inputs/catalog-author-args.type';
import { GetCatalogStudioResultsType } from '../models/results/get-catalog-studio-results.type';
import { CatalogStudioArgsType } from '../models/inputs/catalog-studio-args.type';
import { CatalogCharacterArgsType } from '../models/inputs/catalog-character-args.type';
import { GetCatalogCharacterResultsType } from '../models/results/get-catalog-character-results.type';
import { GetCatalogCollectionResultsType } from '../models/results/get-catalog-collection-results.type';
import { CatalogCollectionArgsType } from '../models/inputs/catalog-collection-args.type';

import { CatalogQueryType, CatalogRootResolver } from './catalog-root.resolver';

@Resolver(CatalogQueryType)
export class CatalogQueryResolver extends CatalogRootResolver {
    constructor(private catalogService: CatalogService) {
        super();
    }

    @ResolveField(() => GetCatalogAnimeResultsType)
    async getCatalogAnimeList(
        @Args() args: CatalogAnimeArgsType,
        @Args() pages: PaginationArgsType,
    ): Promise<GetCatalogAnimeResultsType> {
        return await this.catalogService.getCatalogAnimeList(args, pages);
    }

    @ResolveField(() => GetCatalogCollectionResultsType)
    async getCatalogCollectionList(
        @Args() args: CatalogCollectionArgsType,
        @Args() pages: PaginationArgsType,
    ): Promise<GetCatalogCollectionResultsType> {
        return this.catalogService.getCatalogCollectionList(args, pages);
    }

    @ResolveField(() => GetCatalogAuthorResultsType)
    async getCatalogAuthorList(
        @Args() args: CatalogAuthorArgsType,
        @Args() pages: PaginationArgsType,
    ): Promise<GetCatalogAuthorResultsType> {
        return await this.catalogService.getCatalogAuthorList(args, pages);
    }

    @ResolveField(() => GetCatalogStudioResultsType)
    async getCatalogStudioList(
        @Args() args: CatalogStudioArgsType,
        @Args() pages: PaginationArgsType,
    ): Promise<GetCatalogStudioResultsType> {
        return await this.catalogService.getCatalogStudioList(args, pages);
    }

    @ResolveField(() => GetCatalogCharacterResultsType)
    async getCatalogCharacterList(
        @Args() args: CatalogCharacterArgsType,
        @Args() pages: PaginationArgsType,
    ): Promise<GetCatalogCharacterResultsType> {
        return await this.catalogService.getCatalogCharacterList(args, pages);
    }
}
