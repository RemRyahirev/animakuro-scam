import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    UserCollectionQueryType,
    UserCollectionRootResolver,
} from './user-collection-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserCollectionResultsType } from '../models/results/get-list-user-collection-results.type';
import { GetUserCollectionResultsType } from '../models/results/get-user-collection-results.type';
import { UserCollectionService } from '../services/user-collection.service';

@Resolver(UserCollectionQueryType)
export class UserCollectionQueryResolver extends UserCollectionRootResolver {
    constructor(private userCollectionService: UserCollectionService) {
        super();
    }

    @ResolveField(() => GetUserCollectionResultsType)
    async getUserCollection(
        @Args('id') id: string,
    ): Promise<GetUserCollectionResultsType> {
        return await this.userCollectionService.getUserCollection(id);
    }

    @ResolveField(() => GetListUserCollectionResultsType)
    async getUserCollectionList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        return await this.userCollectionService.getUserCollectionList(args);
    }

    @ResolveField(() => GetListUserCollectionResultsType)
    async getUserCollectionListByUserId(
        @Args('user_id') user_id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        return this.userCollectionService.getUserCollectionListByUserId(
            user_id,
            args,
        );
    }
}
