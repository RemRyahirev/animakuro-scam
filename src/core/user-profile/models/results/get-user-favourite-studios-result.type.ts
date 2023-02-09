import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Studio } from '../../../studio/models/studio.model';

@ObjectType()
export class UpdateUserFavouriteStudiosResultType extends BaseResultsType {
    @Field(() => [Studio], {
        nullable: true,
        description: 'User Profile list',
    })
    userFavouriteStudios: Studio[] | null;
}
