import { Module } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchRootResolver } from './resolvers/search-root.resolver';
import { SearchQueryResolver } from './resolvers/search-query.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientConfig } from '../../common/grpc';
import { SearchGrpcService } from "./services/search.grpc.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'DOCUMENT_PACKAGE',
                ...grpcClientConfig,
            },
        ])
    ],
    providers: [SearchService, SearchRootResolver, SearchQueryResolver, SearchGrpcService],
    exports: [],
})
export class SearchModule {}
