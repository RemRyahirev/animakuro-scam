import { Field, ID, ObjectType } from '@nestjs/graphql';

import { File } from '@app/common/models/results/file.model';
import { ProfileStatistics } from '@app/common/models/results/profile-statistics.model';

import { ProfileSettings } from '../../profile-settings/models/profile-settings.model';
import { User } from '../../user/models/user.model';

@ObjectType()
export class UserProfile {
    @Field(() => ID, {
        description: 'Unique ID of the user-profile',
    })
    id?: string;

    // это поле - для вложенной выдачи связанного User!
    @Field(() => User)
    user: User;

    // это поле - на общем уровне, показывает просто id подключенного Юзера
    @Field()
    user_id: string;

    // ! вернуть это поле после того, как оформлю UserAnime целиком
    // @Field(() => UserAnime)
    // user_anime: UserAnime;

    @Field(() => ProfileSettings, { nullable: true })
    profile_settings: ProfileSettings | null;

    @Field(() => File, { nullable: true })
    banner?: File;

    @Field(() => File, { nullable: true })
    cover?: File;

    @Field(() => ProfileStatistics, {
        nullable: true,
        description: 'User profile statistics',
    })
    statistics?: ProfileStatistics;
}
