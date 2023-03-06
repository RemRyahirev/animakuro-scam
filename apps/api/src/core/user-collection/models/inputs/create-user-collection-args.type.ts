import { IsBoolean, IsOptional, ArrayMaxSize, IsArray } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { CreateUserFolderArgsType } from '../../../user-folder/models/inputs/create-user-folder-args.type';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ArgsType()
export class CreateUserCollectionArgsType extends CreateUserFolderArgsType {
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
