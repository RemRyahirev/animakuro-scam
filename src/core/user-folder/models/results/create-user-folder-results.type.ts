import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { UserFolder } from '../user-folder.model';

@ObjectType()
export class CreateUserFolderResultsType extends BaseResultsType {
    @Field(() => UserFolder, {
        nullable: true,
        description: 'User Folder',
    })
    userFolder: UserFolder | null; // имя для поля - обратить внимание. После тестов удалить коммент
}
