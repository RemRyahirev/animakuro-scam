import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Studio } from '../../../studio/models/studio.model';

@ObjectType()
export class GetCatalogStudioResultsType extends BaseResultsType {
    @Field(() => [Studio], {
        nullable: true,
        description: 'Catalog Studio list',
    })
    studio_list: Studio[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
