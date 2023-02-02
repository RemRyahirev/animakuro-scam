import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { UserCatalog } from '../user-catalog.model';

@ObjectType()
export class GetListUserCatalogResultsType extends BaseResultsType {
    @Field(() => [UserCatalog], {
        nullable: true,
        description: 'User Catalog list',
    })
    userCatalogList: UserCatalog[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
