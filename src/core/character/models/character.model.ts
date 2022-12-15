import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {CharacterType} from "../../../common/models/enums";

// здесь - обычные типы (а-ля строка), даже в enum-ах
@ObjectType()
export class Character {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    bucket_id: string;

    @Field(() => String)
    character_name: string;

    @Field(() => CharacterType, { defaultValue: CharacterType.PROTAGONIST })
    importance: string;

    @Field(() => String)
    description: string;
}
