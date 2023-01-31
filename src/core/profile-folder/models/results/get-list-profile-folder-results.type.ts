import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { ProfileFolder } from '../profile-folder.model';

@ObjectType()
export class GetListProfileFolderResultsType extends BaseResultsType {
    @Field(() => [ProfileFolder], {
        nullable: true,
        description: 'Profile Folder list',
    })
    profileFolderList: ProfileFolder[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
