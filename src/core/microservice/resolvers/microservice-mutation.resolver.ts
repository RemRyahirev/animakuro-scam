import {
    MicroserviceMutationType,
    MicroserviceRootResolver,
} from './microservice-root.resolver';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { BaseResultsType } from '../../../common/models/results';
import { MicroserviceGrpcService } from '../services/microservice.grpc.service';

@Resolver(MicroserviceMutationType)
export class MicroserviceMutationResolver extends MicroserviceRootResolver {
    constructor(private microserviceGrpcService: MicroserviceGrpcService) {
        super();
    }

    @ResolveField(() => BaseResultsType)
    async forceUpdateDbELC(): Promise<BaseResultsType> {
        return await this.microserviceGrpcService.forceUpdateDbELC();
    }
}
