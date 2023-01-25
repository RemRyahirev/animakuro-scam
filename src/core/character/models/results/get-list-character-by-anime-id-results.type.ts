import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Character } from '../character.model';

@ObjectType()
export class GetListCharacterByAnimeIdResultsType extends BaseResultsType {
    @Field(() => [Character], {
        nullable: true,
        description: 'Character list',
    })
    character_list: Character[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
