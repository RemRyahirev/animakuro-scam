import { ResolveField, Resolver } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { MicroserviceGrpcService } from '../services/microservice.grpc.service';

import {
    MicroserviceMutationType,
    MicroserviceRootResolver,
} from './microservice-root.resolver';

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
