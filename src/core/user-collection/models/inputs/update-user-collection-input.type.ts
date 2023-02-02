import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { UpdateUserFolderInputType } from '../../../user-folder/models/inputs/update-user-folder-input.type';

@ArgsType()
export class UpdateUserCollectionInputType extends UpdateUserFolderInputType {
    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean)
    is_public: boolean;
}
