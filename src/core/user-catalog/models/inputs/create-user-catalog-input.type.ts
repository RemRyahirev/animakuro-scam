import { CreateUserFolderInputType } from '../../../user-folder/models/inputs/create-user-folder-input.type';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@ArgsType()
export class CreateUserCatalogInputType extends CreateUserFolderInputType {
    @IsBoolean()
    @Field(() => Boolean)
    is_public: boolean;
}
