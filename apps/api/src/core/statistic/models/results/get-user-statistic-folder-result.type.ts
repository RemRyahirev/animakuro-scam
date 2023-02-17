import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { UserStatisticFolder } from '../statistic.model';

@ObjectType()
export class GetUserStatisticFolderResultsType extends BaseResultsType {
    @Field(() => [UserStatisticFolder], {
        nullable: true,
        description: 'UserStatisticFolder',
    })
    userStatisticFolders: UserStatisticFolder[] | null;
}
