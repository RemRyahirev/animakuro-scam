import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { UserFolder } from '../user-folder.model';

@ObjectType()
export class GetListUserFolderResultsType extends BaseResultsType {
    @Field(() => [UserFolder], {
        nullable: true,
        description: 'User Folder list',
    })
    userFolderList: UserFolder[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
