import { Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

@ObjectType()
export class MicroserviceMutationType {
    @Field(() => BaseResultsType, {
        description: 'Force sync elastic with PostgreSQL',
    })
    forceUpdateDbELC: BaseResultsType;
}

@Resolver()
export class MicroserviceRootResolver {
    @Mutation(() => MicroserviceMutationType, {
        description: 'Microservice mutations',
    })
    microserviceMutations() {
        return {};
    }
}
