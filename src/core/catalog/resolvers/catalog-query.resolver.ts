import { CatalogQueryType, CatalogRootResolver } from './catalog-root.resolver';
import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { CatalogService } from '../services/catalog.service';
import { Resolver, ResolveField, Args } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetCatalogAuthorResultsType } from '../models/results/get-catalog-author-results.type';
import { CatalogAuthorInputType } from '../models/inputs/catalog-author-input.type';
import { GetCatalogStudioResultsType } from '../models/results/get-catalog-studio-results.type';
import { CatalogStudioInputType } from '../models/inputs/catalog-studio-input.type';
import { CatalogCharacterInputType } from '../models/inputs/catalog-character-input.type';
import { GetCatalogCharacterResultsType } from '../models/results/get-catalog-character-results.type';
import { GetCatalogCollectionResultsType } from '../models/results/get-catalog-collection-results.type';
import { CatalogCollectionInputType } from '../models/inputs/catalog-collection-input.type';

@Resolver(CatalogQueryType)
export class CatalogQueryResolver extends CatalogRootResolver {
    constructor(private catalogService: CatalogService) {
        super();
    }

    @ResolveField(() => GetCatalogAnimeResultsType)
    async getCatalogAnimeList(
        @Args() args: CatalogAnimeInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetCatalogAnimeResultsType> {
        return await this.catalogService.getCatalogAnimeList(args, pages);
    }

    @ResolveField(() => GetCatalogCollectionResultsType)
    async getCatalogCollectionList(
        @Args() args: CatalogCollectionInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetCatalogCollectionResultsType> {
        return this.catalogService.getCatalogCollectionList(args, pages);
    }

    @ResolveField(() => GetCatalogAuthorResultsType)
    async getCatalogAuthorList(
        @Args() args: CatalogAuthorInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetCatalogAuthorResultsType> {
        return await this.catalogService.getCatalogAuthorList(args, pages);
    }

    @ResolveField(() => GetCatalogStudioResultsType)
    async getCatalogStudioList(
        @Args() args: CatalogStudioInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetCatalogStudioResultsType> {
        return await this.catalogService.getCatalogStudioList(args, pages);
    }

    @ResolveField(() => GetCatalogCharacterResultsType)
    async getCatalogCharacterList(
        @Args() args: CatalogCharacterInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetCatalogCharacterResultsType> {
        return await this.catalogService.getCatalogCharacterList(args, pages);
    }
}
