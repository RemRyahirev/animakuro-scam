import { IsBoolean, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { CreateUserFolderInputType } from '../../../user-folder/models/inputs/create-user-folder-input.type';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ArgsType()
export class CreateUserCollectionInputType extends CreateUserFolderInputType {
    @IsBoolean()
    @Field(() => Boolean)
    is_public: boolean;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    thumbnail?: Promise<FileUpload>;
}
