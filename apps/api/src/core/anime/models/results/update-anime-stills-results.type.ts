import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Stills } from '../stills.model';

@ObjectType()
export class UpdateAnimeStillsResultsType extends BaseResultsType {
    @Field(() => Stills)
    stills: Stills;
}
