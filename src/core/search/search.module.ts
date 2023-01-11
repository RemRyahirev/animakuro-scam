import { Module } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchRootResolver } from './resolvers/search-root.resolver';
import { SearchQueryResolver } from './resolvers/search-query.resolver';

@Module({
    imports: [],
    providers: [SearchService, SearchRootResolver, SearchQueryResolver],
    exports: [],
})
export class SearchModule {}
