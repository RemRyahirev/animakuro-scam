import { Field, ObjectType } from '@nestjs/graphql';
import { File } from '@app/common/models/results/file.model';
import { UserFolder } from '../../user-folder/models/user-folder.model';
import { ArrayMaxSize } from 'class-validator';

@ObjectType()
export class UserCollection extends UserFolder {
    @Field(() => Boolean, { description: 'Is catalog public?' })
    is_public: boolean;

    @Field(() => File, { nullable: true })
    thumbnail?: File;

    @ArrayMaxSize(8)
    @Field(() => [String], { nullable: true })
    hashtags?: string[];

    @Field(()=> Boolean, {nullable:true})
    is_spoiler?: boolean
}
