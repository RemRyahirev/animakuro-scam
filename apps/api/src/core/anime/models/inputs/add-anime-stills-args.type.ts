import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { IsOptional, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

import { UploadStillsInputType } from '../stills.model';

@ArgsType()
export class AddAnimeStillsArgsType {
    @IsUUID()
    @Field(() => ID, {
        description: 'Id of parrent anime',
    })
    anime_id: string;

    @IsOptional()
    @Field(() => [GraphQLUpload], {
        nullable: true,
        description: 'Need if you gonna upload file to cdn',
    })
    stills_files?: Promise<FileUpload>[];

    @IsOptional()
    @Field(() => [UploadStillsInputType])
    stills: UploadStillsInputType[];
}
