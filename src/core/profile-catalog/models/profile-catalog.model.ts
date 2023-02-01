import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileFolder } from '../../profile-folder/models/profile-folder.model';

@ObjectType()
export class ProfileCatalog extends ProfileFolder {
    @Field(() => Boolean, { description: 'Is catalog public?' })
    is_public: boolean;
}
