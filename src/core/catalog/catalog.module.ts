import { Module } from '@nestjs/common';
import { CatalogService } from './services/catalog.service';
import { CatalogRootResolver } from './resolvers/catalog-root.resolver';
import { CatalogQueryResolver } from './resolvers/catalog-query.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientConfig } from '../../common/grpc';
import { CatalogGrpcService } from "./services/catalog.grpc.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'DOCUMENT_PACKAGE',
                ...grpcClientConfig,
            },
        ])
    ],
    providers: [CatalogService, CatalogRootResolver, CatalogQueryResolver, CatalogGrpcService],
    exports: [],
})
export class CatalogModule {}
