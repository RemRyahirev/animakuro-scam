import { Field, ObjectType } from '@nestjs/graphql';
import { File } from '@app/common/models/results/file.model';
import { UserFolder } from '../../user-folder/models/user-folder.model';

@ObjectType()
export class UserCollection extends UserFolder {
    @Field(() => Boolean, { description: 'Is catalog public?' })
    is_public: boolean;

    @Field(() => File, { nullable: true })
    thumbnail?: File;
}
