import { ObjectType } from '@nestjs/graphql';

import { BaseResultsType, PaginationResultsType } from '@app/common/models/results';

import { Stills } from '../stills.model';

@ObjectType()
export class GetStillsByAnimeIdResultsType extends BaseResultsType {
    /**
     * Stills list
     */
    stills?: Stills[];

    pagination: PaginationResultsType;
}
