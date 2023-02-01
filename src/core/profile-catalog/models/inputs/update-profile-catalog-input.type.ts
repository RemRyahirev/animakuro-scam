import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { UpdateProfileFolderInputType } from '../../../profile-folder/models/inputs/update-profile-folder-input.type';

@ArgsType()
export class UpdateProfileCatalogInputType extends UpdateProfileFolderInputType {
    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean)
    is_public: boolean;
}
