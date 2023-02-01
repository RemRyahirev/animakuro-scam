import { CreateProfileFolderInputType } from '../../../profile-folder/models/inputs/create-profile-folder-input.type';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@ArgsType()
export class CreateProfileCatalogInputType extends CreateProfileFolderInputType {
    @IsBoolean()
    @Field(() => Boolean)
    is_public: boolean;
}
