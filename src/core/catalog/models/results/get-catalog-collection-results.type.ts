import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserCollection } from '../../../user-collection/models/user-collection.model';

@ObjectType()
export class GetCatalogCollectionResultsType extends BaseResultsType {
    @Field(() => [UserCollection], {
        nullable: true,
        description: 'Catalog Collection list',
    })
    collection_list: UserCollection[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
