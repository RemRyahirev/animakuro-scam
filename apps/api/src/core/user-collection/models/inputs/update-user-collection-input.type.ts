import { ArrayMaxSize, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { UpdateUserFolderInputType } from '../../../user-folder/models/inputs/update-user-folder-input.type';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ArgsType()
export class UpdateUserCollectionInputType extends UpdateUserFolderInputType {
    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean)
    is_public: boolean;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    thumbnail?: Promise<FileUpload>;

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(8)
    @Field(() => [String], { nullable: true })
    hashtags?: string[];

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, { nullable: true })
    is_spoiler?: boolean;
}
