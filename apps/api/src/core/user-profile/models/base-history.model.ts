import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { UserProfile } from './user-profile.model';

export enum HistorySortFields {
    SPENT_TIME = 'spent_time',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at'
}

registerEnumType(HistorySortFields, {
    name: 'HistorySortFields',
});

@ObjectType()
export class BaseHistoryModel {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    user_profile_id: string;

    @Field(() => Int)
    spent_time: number;

    created_at: Date;

    updated_at: Date;

    user_profile?: UserProfile;
}
