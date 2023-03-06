import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { UserFolder } from '../user-folder.model';

@ObjectType()
export class CreateUserFolderResultsType extends BaseResultsType {
    /**
     * User Folder
     */
    userFolder?: UserFolder; // имя для поля - обратить внимание. После тестов удалить коммент
}
