import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { UserFolder } from '../user-folder.model';

@ObjectType()
export class GetUserFolderByUserIdResultsType extends BaseResultsType {
    @Field(() => [UserFolder], {
        nullable: true,
        description: 'User Folder list',
    })
    userFolderList: UserFolder[] | null;
}
