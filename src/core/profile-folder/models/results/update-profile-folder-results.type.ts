import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { ProfileFolder } from '../profile-folder.model';

@ObjectType()
export class UpdateProfileFolderResultsType extends BaseResultsType {
    @Field(() => ProfileFolder, {
        nullable: true,
        description: 'Profile Folder',
    })
    profileFolder: ProfileFolder | null; // имя для поля - обратить внимание. После тестов удалить коммент
}
