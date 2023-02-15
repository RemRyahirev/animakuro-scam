import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from 'core/user/models/user.model';

@ObjectType()
export class File {
    @Field(() => ID, {
        description: 'Unique ID of the file',
    })
    file_id: string;

    @Field(() => String, {
        description: 'CDN bucket name',
    })
    bucket_name: string;

    @Field(() => User, {
        description: 'User who uploaded this file',
    })
    user: User;

    @Field(() => String, {
        description: 'Full url to resource',
    })
    url: string;

    @Field(() => Date, { description: 'When the file was uploaded' })
    created_at: Date;
}
