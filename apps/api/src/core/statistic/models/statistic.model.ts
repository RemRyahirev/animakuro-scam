import { Field, ObjectType } from '@nestjs/graphql';

import { UserFolder } from '../../user-folder/models/user-folder.model';

@ObjectType()
export class UserStatisticFolder {
    @Field(() => UserFolder)
    folder: UserFolder;

    @Field()
    count: number;
}
