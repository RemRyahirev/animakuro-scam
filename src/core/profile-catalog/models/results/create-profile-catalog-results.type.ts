import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { ProfileCatalog } from '../profile-catalog.model';

@ObjectType()
export class CreateProfileCatalogResultsType extends BaseResultsType {
    @Field(() => ProfileCatalog, {
        nullable: true,
        description: 'Profile Catalog',
    })
    profileCatalog: ProfileCatalog | null;
}
