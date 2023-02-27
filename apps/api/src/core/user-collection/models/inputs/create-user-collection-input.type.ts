import { IsBoolean } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { CreateUserFolderInputType } from '../../../user-folder/models/inputs/create-user-folder-input.type';

@ArgsType()
export class CreateUserCollectionInputType extends CreateUserFolderInputType {
    @IsBoolean()
    @Field(() => Boolean)
    is_public: boolean;
}
