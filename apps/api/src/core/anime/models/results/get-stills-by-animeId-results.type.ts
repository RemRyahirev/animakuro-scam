import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType, PaginationResultsType } from '@app/common/models/results';

import { Stills } from '../stills.model';

@ObjectType()
export class GetStillsByAnimeIdResultsType extends BaseResultsType {
    @Field(() => [Stills], {
        nullable: true,
        description: 'Stills list',
    })
    stills?: Stills[];

    @Field(() => PaginationResultsType)
    pagination: PaginationResultsType;
}
