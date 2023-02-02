import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { UserCatalog } from '../user-catalog.model';

@ObjectType()
export class CreateUserCatalogResultsType extends BaseResultsType {
    @Field(() => UserCatalog, {
        nullable: true,
        description: 'User Catalog',
    })
    userCatalog: UserCatalog | null;
}
