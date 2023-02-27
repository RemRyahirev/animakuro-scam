import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { Character } from '../../../character/models/character.model';

@ObjectType()
export class GetCatalogCharacterResultsType extends BaseResultsType {
    @Field(() => [Character], {
        nullable: true,
        description: 'Catalog Character list',
    })
    character_list: Character[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
