import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientConfig } from '../../common/grpc';
import { MicroserviceRootResolver } from './resolvers/microservice-root.resolver';
import { MicroserviceMutationResolver } from './resolvers/microservice-mutation.resolver';
import { MicroserviceGrpcService } from './services/microservice.grpc.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'DOCUMENT_PACKAGE',
                ...grpcClientConfig,
            },
        ]),
    ],
    providers: [
        MicroserviceRootResolver,
        MicroserviceMutationResolver,
        MicroserviceGrpcService,
    ],
})
export class MicroserviceModule {}
