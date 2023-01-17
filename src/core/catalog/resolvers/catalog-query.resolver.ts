import { CatalogQueryType, CatalogRootResolver } from "./catalog-root.resolver";
import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { CatalogService } from '../services/catalog.service';
import { Resolver, ResolveField, Args } from '@nestjs/graphql';
import { PaginationInputType } from "../../../common/models/inputs";
import { GetCatalogAuthorResultsType } from "../models/results/get-catalog-author-results.type";
import { CatalogAuthorInputType } from "../models/inputs/catalog-author-input-type";

@Resolver(CatalogQueryType)
export class CatalogQueryResolver extends CatalogRootResolver {
    constructor(private catalogService: CatalogService) {
        super();
    }

    @ResolveField(() => GetCatalogAnimeResultsType)
    async getCatalogAnimeList(
        @Args() args: CatalogAnimeInputType,
        @Args() pages: PaginationInputType
    ): Promise<GetCatalogAnimeResultsType> {
        return await this.catalogService.getCatalogAnimeList(args, pages);
    }

    @ResolveField(() => GetCatalogAuthorResultsType)
    async getCatalogAuthorList(
        @Args() args: CatalogAuthorInputType,
        @Args() pages: PaginationInputType
    ): Promise<GetCatalogAuthorResultsType> {
        return await this.catalogService.getCatalogAuthorList(args, pages);
    }
}
