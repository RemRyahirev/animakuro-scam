import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { ProfileCatalog } from '../profile-catalog.model';

@ObjectType()
export class GetListProfileCatalogResultsType extends BaseResultsType {
    @Field(() => [ProfileCatalog], {
        nullable: true,
        description: 'Profile Catalog list',
    })
    profileCatalogList: ProfileCatalog[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
