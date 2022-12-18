import { Field, ObjectType } from "type-graphql";
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Character } from "../character.model";

@ObjectType()
export class GetListCharacterResultsType extends BaseResultsType {
    @Field(() => [Character], {
        nullable: true,
        description: 'Character list',
    })
    characterList: Character[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
